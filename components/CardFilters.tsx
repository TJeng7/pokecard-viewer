import { SET_OPTIONS } from "../consts/setData";

interface Props {
	searchFilter: SearchFilter;
	setSearchFilter: (filter: SearchFilter) => void;
}

export const CardFilters: React.FC<Props> = ({ searchFilter, setSearchFilter }) => {
	return(
		<div className="filter-sort">
			<div className="filters">
				<select
					value={searchFilter.set}
					onChange={(e) => {
					setSearchFilter({
						name: searchFilter.name,
						artist: searchFilter.artist,
						rarity: searchFilter.rarity,
						set: e.target.value,
					});
					}}
					className="dropdown"
				>
				{SET_OPTIONS.map((label) => (
					<option key={label} value={label}>
							{label}
					</option>
				))}
				</select>
			</div>
		</div>
	);
};