import styles from "./SearchResult.module.scss";
import { Booth } from "../../types/booth";
import BoothCard from "../BoothCard/BoothCard";

export default function SearchResult({ data }: { data: Booth[] }) {
    return (
        <div className={styles.container}>
            <div className={styles.search_result}>
                {
                    data.length === 0 && <>検索結果：見つかりませんでした。キーワードを変えてもう一度お試しください。</>
                }
                {
                    data.map(each =>
                        <BoothCard data={each}></BoothCard>
                    )
                }
            </div>
        </div>
    );
}