import { SET_OPTIONS } from "../../consts/setData";

import styles from "./CardFilters.module.scss"

interface Props {
	searchFilter: SearchFilter;
	setSearchFilter: (filter: SearchFilter) => void;
}

export const CardFilters: React.FC<Props> = ({ searchFilter, setSearchFilter }) => {
	return(
		<div className={styles.filterSort}>
			<div className={styles.filters}>
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
					className={styles.dropdown}
				>
				{SET_OPTIONS.map((label) => (
					<option key={label} value={label} className={styles.option}>
							{label}
					</option>
				))}
				</select>
			</div>
		</div>
	);
};