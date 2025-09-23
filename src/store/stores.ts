export default interface DataStore<T> {
    data: T | null;
    setData: (data: T) => void;
}
