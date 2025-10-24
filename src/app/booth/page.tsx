import BoothCard from "../../components/BoothCard/BoothCard";
import { getAllBooths } from "../../lib/BoothsProvider"
import styles from "./page.module.scss";

export default async function BoothPage() {
    const booths = getAllBooths();
    return (
        <>
            <h1 className={styles.title}>Booths</h1>
            {booths.map(booth => <BoothCard key={booth.booth_id} data={booth} />)}
        </>
    )
}