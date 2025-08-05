def process_files_with_prefix(prefix, output_dir=None, fields_to_keep=None):
    """
    Process all JSON files in the current directory that start with the given prefix.
    
    Args:
        prefix (str): Prefix to match filenames
        output_dir (str, optional): Directory to save filtered files. If None, saves in current directory
        fields_to_keep (list, optional): Fields to keep. Defaults to the specified fields
    
    Returns:
        int: Number of files successfully processed
    """
    if fields_to_keep is None:
        fields_to_keep = ["id", "name", "artist", "rarity", "images"]
    
    # Find all files that start with the prefix
    pattern = f"{prefix}*"
    matching_files = glob.glob(pattern)
    
    # Filter to only JSON files
    json_files = [f for f in matching_files if f.lower().endswith('.json')]
    
    if not json_files:
        print(f"No JSON files found starting with '{prefix}' in the current directory.")
        return 0
    
    print(f"Found {len(json_files)} JSON file(s) starting with '{prefix}':")
    for file in json_files:
        print(f"  - {file}")
    print()
    
    # Create output directory if specified
    if output_dir:
        os.makedirs(output_dir, exist_ok=True)
    
    successful_count = 0
    
    # Process each file
    for input_file in json_files:
        print(f"Processing: {input_file}")
        
        # Generate output filename
        if output_dir:
            output_file = os.path.join(output_dir, f"filtered_{input_file}")
        else:
            # Add "filtered_" prefix to the original filename
            output_file = f"filtered_{input_file}"
        
        # Process the file
        if process_json_file(input_file, output_file, fields_to_keep):
            successful_count += 1
        print()  # Add blank line for readability
    
    print(f"Successfully processed {successful_count} out of {len(json_files)} files.")
    return successful_count#!/usr/bin/env python3
"""
Script to filter JSON objects to only include specific fields:
id, name, artist, rarity, and images

Can process either a single file or all files in the current directory
that begin with a specified prefix.
"""

import json
import sys
import argparse
from pathlib import Path
import glob
import os


def filter_object(obj, fields_to_keep):
    """
    Filter a single object to only include specified fields.
    
    Args:
        obj (dict): The object to filter
        fields_to_keep (list): List of field names to keep
    
    Returns:
        dict: Filtered object containing only the specified fields
    """
    filtered_obj = {}
    for field in fields_to_keep:
        if field in obj:
            filtered_obj[field] = obj[field]
        else:
            # Optional: Add warning for missing fields
            print(f"Warning: Field '{field}' not found in object with id: {obj.get('id', 'unknown')}", 
                  file=sys.stderr)
    return filtered_obj


def process_json_file(input_file, output_file=None, fields_to_keep=None):
    """
    Process a JSON file and filter objects to only include specified fields.
    
    Args:
        input_file (str): Path to input JSON file
        output_file (str, optional): Path to output JSON file. If None, prints to stdout
        fields_to_keep (list, optional): Fields to keep. Defaults to the specified fields
    
    Returns:
        bool: True if successful, False otherwise
    """
    if fields_to_keep is None:
        fields_to_keep = ["id", "name", "artist", "rarity", "images"]
    
    try:
        # Read the input JSON file
        with open(input_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Handle both single objects and arrays of objects
        if isinstance(data, list):
            filtered_data = [filter_object(obj, fields_to_keep) for obj in data]
        elif isinstance(data, dict):
            filtered_data = filter_object(data, fields_to_keep)
        else:
            raise ValueError("JSON data must be either an object or an array of objects")
        
        # Output the filtered data
        if output_file:
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump(filtered_data, f, indent=2, ensure_ascii=False)
            print(f"Filtered data written to: {output_file}")
        else:
            print(json.dumps(filtered_data, indent=2, ensure_ascii=False))
        
        return True
    
    except FileNotFoundError:
        print(f"Error: File '{input_file}' not found.", file=sys.stderr)
        return False
    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON in file '{input_file}': {e}", file=sys.stderr)
        return False
    except Exception as e:
        print(f"Error processing file '{input_file}': {e}", file=sys.stderr)
        return False


def combine_files_with_prefix(prefix, output_file=None, fields_to_keep=None):
    """
    Process and combine all JSON files in the current directory that start with the given prefix
    into a single JSON array.
    
    Args:
        prefix (str): Prefix to match filenames
        output_file (str, optional): Output file path. If None, uses "combined_{prefix}.json"
        fields_to_keep (list, optional): Fields to keep. Defaults to the specified fields
    
    Returns:
        int: Number of files successfully processed
    """
    if fields_to_keep is None:
        fields_to_keep = ["id", "name", "artist", "rarity", "images"]
    
    # Find all files that start with the prefix
    pattern = f"{prefix}*"
    matching_files = glob.glob(pattern)
    
    # Filter to only JSON files
    json_files = [f for f in matching_files if f.lower().endswith('.json')]
    
    if not json_files:
        print(f"No JSON files found starting with '{prefix}' in the current directory.")
        return 0
    
    print(f"Found {len(json_files)} JSON file(s) starting with '{prefix}':")
    for file in json_files:
        print(f"  - {file}")
    print()
    
    combined_data = []
    successful_count = 0
    
    # Process each file
    for input_file in json_files:
        print(f"Processing: {input_file}")
        
        try:
            # Read the input JSON file
            with open(input_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            # Handle both single objects and arrays of objects
            if isinstance(data, list):
                filtered_objects = [filter_object(obj, fields_to_keep) for obj in data]
                combined_data.extend(filtered_objects)
                print(f"  Added {len(filtered_objects)} objects from {input_file}")
            elif isinstance(data, dict):
                filtered_obj = filter_object(data, fields_to_keep)
                combined_data.append(filtered_obj)
                print(f"  Added 1 object from {input_file}")
            else:
                print(f"  Warning: Skipping {input_file} - not a valid JSON object or array", file=sys.stderr)
                continue
            
            successful_count += 1
        
        except FileNotFoundError:
            print(f"  Error: File '{input_file}' not found.", file=sys.stderr)
        except json.JSONDecodeError as e:
            print(f"  Error: Invalid JSON in file '{input_file}': {e}", file=sys.stderr)
        except Exception as e:
            print(f"  Error processing file '{input_file}': {e}", file=sys.stderr)
    
    print()
    
    if not combined_data:
        print("No data to combine - all files failed to process or contained no valid data.")
        return 0
    
    # Set default output filename if not provided
    if output_file is None:
        output_file = f"combined_{prefix}.json"
    
    # Write the combined data
    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(combined_data, f, indent=2, ensure_ascii=False)
        
        print(f"Successfully combined {len(combined_data)} objects from {successful_count} files into: {output_file}")
        return successful_count
    
    except Exception as e:
        print(f"Error writing combined file '{output_file}': {e}", file=sys.stderr)
        return 0


def main():
    parser = argparse.ArgumentParser(
        description="Filter JSON objects to only include specific fields: id, name, artist, rarity, images"
    )
    
    # Create mutually exclusive group for input modes
    input_group = parser.add_mutually_exclusive_group(required=True)
    input_group.add_argument("--file", "-f", help="Path to a single input JSON file")
    input_group.add_argument("--prefix", "-p", help="Process all JSON files starting with this prefix in current directory")
    input_group.add_argument("--combine", "-c", help="Combine all JSON files starting with this prefix into one file after trimming")
    
    parser.add_argument("-o", "--output", 
                       help="Output path: file path (for single file), directory (for prefix mode), or file path (for combine mode)")
    parser.add_argument("--fields", nargs="+", 
                       default=["id", "name", "artist", "rarity", "images"],
                       help="Fields to keep (default: id name artist rarity images)")
    
    args = parser.parse_args()
    
    if args.file:
        # Single file mode
        if not Path(args.file).exists():
            print(f"Error: Input file '{args.file}' does not exist.", file=sys.stderr)
            sys.exit(1)
        
        if not process_json_file(args.file, args.output, args.fields):
            sys.exit(1)
    
    elif args.prefix:
        # Prefix mode - process all files starting with the prefix separately
        successful_count = process_files_with_prefix(args.prefix, args.output, args.fields)
        if successful_count == 0:
            sys.exit(1)
    
    elif args.combine:
        # Combine mode - process and combine all files starting with the prefix
        successful_count = combine_files_with_prefix(args.combine, args.output, args.fields)
        if successful_count == 0:
            sys.exit(1)
    
    else:
        # This shouldn't happen due to required=True, but just in case
        parser.print_help()
        sys.exit(1)


if __name__ == "__main__":
    main()
