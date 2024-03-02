import ColumnAttributes from "./ColumnInterface";

interface TableProps {
	data: Array<any>,
	column: Array<ColumnAttributes>,
	useAction: boolean,
	urlEdit?: string,
	onDelete: () => void
}

export default TableProps