import { ChangeEvent } from "react";

import styles from "./Footer.module.scss"

interface Props {
    onImportJSON: (e:ChangeEvent<HTMLInputElement>) => void;
    onExportJSON: () => void;
}

export const Footer: React.FC<Props> = ({ onImportJSON, onExportJSON }) => {

    return (<div className={styles.footer}>
        <div> 
        Credit to <a href="https://www.instagram.com/potato.stirfry/">potato.stirfry</a> on Instagram for background image.
        </div>
        <input type="file" onChange={onImportJSON} />
        <button
            onClick={() => {
                onExportJSON();
            }}
        >
        Export Wishlist
        </button>
    </div>);
};