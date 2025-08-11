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
					value={searchFilter.series}
					onChange={(e) => {
					setSearchFilter({
						name: searchFilter.name,
						artist: searchFilter.artist,
						rarity: searchFilter.rarity,
						series: e.target.value,
					});
					}}
					className="dropdown"
				>
					{SET_OPTIONS.map((opt: SetOption) => (
					<option key={opt.label} value={opt.label}>
						{opt.label}
					</option>
					))}
				</select>
			</div>
		</div>
	);
};