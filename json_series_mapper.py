#!/usr/bin/env python3
"""
JSON Series Mapper Script

This script appends a "series" field to JSON objects in a data file by matching
the identifier prefix of their "id" field with corresponding entries in a mapping file.

Usage:
    python json_series_mapper.py <data_file> <mapping_file> [output_file]

Arguments:
    data_file: JSON file containing objects with "id" field (format: "identifier-index")
    mapping_file: JSON file containing objects with "id" and "name" fields
    output_file: Optional output file path (default: overwrites data_file)
"""

import json
import sys
import argparse
from pathlib import Path


def load_json_file(file_path):
    """Load and parse a JSON file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Error: File '{file_path}' not found.")
        sys.exit(1)
    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON in '{file_path}': {e}")
        sys.exit(1)
    except Exception as e:
        print(f"Error reading '{file_path}': {e}")
        sys.exit(1)


def save_json_file(data, file_path):
    """Save data to a JSON file with proper formatting."""
    try:
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"Successfully saved updated data to '{file_path}'")
    except Exception as e:
        print(f"Error saving to '{file_path}': {e}")
        sys.exit(1)


def extract_identifier(id_field):
    """Extract the identifier prefix from an id field (format: 'identifier-index')."""
    if not isinstance(id_field, str):
        return None
    
    # Split by the last hyphen to handle cases like "sv1-base-1" -> "sv1-base"
    parts = id_field.rsplit('-', 1)
    if len(parts) > 1:
        return parts[0]
    return id_field  # Return as-is if no hyphen found


def create_mapping_dict(mapping_data):
    """Create a dictionary mapping identifiers to series names."""
    mapping = {}
    
    # Handle both single object and array of objects
    if isinstance(mapping_data, dict):
        mapping_data = [mapping_data]
    elif not isinstance(mapping_data, list):
        print("Error: Mapping file must contain a JSON object or array of objects.")
        sys.exit(1)
    
    for item in mapping_data:
        if not isinstance(item, dict):
            continue
        
        item_id = item.get('id')
        item_name = item.get('name')
        
        if item_id and item_name:
            mapping[item_id] = item_name
        else:
            print(f"Warning: Skipping mapping item missing 'id' or 'name': {item}")
    
    return mapping


def append_series_field(data, mapping):
    """Append 'series' field to data objects based on identifier mapping."""
    processed_count = 0
    matched_count = 0
    
    # Handle both single object and array of objects
    if isinstance(data, dict):
        data = [data]
        single_object = True
    elif isinstance(data, list):
        single_object = False
    else:
        print("Error: Data file must contain a JSON object or array of objects.")
        sys.exit(1)
    
    for item in data:
        if not isinstance(item, dict):
            continue
        
        processed_count += 1
        item_id = item.get('id')
        
        if not item_id:
            print(f"Warning: Item missing 'id' field: {item}")
            continue
        
        identifier = extract_identifier(item_id)
        if identifier and identifier in mapping:
            item['series'] = mapping[identifier]
            matched_count += 1
            print(f"Matched '{item_id}' -> '{mapping[identifier]}'")
        else:
            print(f"Warning: No mapping found for identifier '{identifier}' (from id '{item_id}')")
    
    print(f"\nProcessed {processed_count} items, {matched_count} matches found.")
    
    return data[0] if single_object else data


def main():
    parser = argparse.ArgumentParser(
        description="Append series field to JSON objects based on identifier mapping",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
    python json_series_mapper.py data.json mapping.json
    python json_series_mapper.py data.json mapping.json output.json
        """
    )
    
    parser.add_argument('data_file', help='JSON file containing data objects')
    parser.add_argument('mapping_file', help='JSON file containing mapping objects')
    parser.add_argument('output_file', nargs='?', help='Output file (default: overwrite data_file)')
    
    args = parser.parse_args()
    
    # Validate input files exist
    if not Path(args.data_file).exists():
        print(f"Error: Data file '{args.data_file}' does not exist.")
        sys.exit(1)
    
    if not Path(args.mapping_file).exists():
        print(f"Error: Mapping file '{args.mapping_file}' does not exist.")
        sys.exit(1)
    
    # Load data files
    print(f"Loading data from '{args.data_file}'...")
    data = load_json_file(args.data_file)
    
    print(f"Loading mapping from '{args.mapping_file}'...")
    mapping_data = load_json_file(args.mapping_file)
    
    # Create mapping dictionary
    mapping = create_mapping_dict(mapping_data)
    print(f"Created mapping for {len(mapping)} identifiers")
    
    # Process data
    print("\nProcessing data...")
    updated_data = append_series_field(data, mapping)
    
    # Save results
    output_file = args.output_file or args.data_file
    save_json_file(updated_data, output_file)


if __name__ == "__main__":
    main()
