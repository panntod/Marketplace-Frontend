import React, { FC, useState, useEffect } from "react";
import ColumnAttributes from "../../interface/ColumnInterface";
import TableProps from "../../interface/TableProopsInterfaces";
import { useNavigate } from "react-router-dom";

const Table: FC<TableProps> = ({ data, column, useAction, urlEdit, onDelete }) => {
	const navigate = useNavigate();
	return (
		<div className="overflow-x-auto">
			<table className="w-full text-sm text-left text-gray-500 mt-5">
				<thead className="text-xs text-gray-700 uppercase border-b-2 border-b-primary-first bg-gray-100">
					<tr>
						{column.map((item: ColumnAttributes, index: number) => (
							<th key={`th-${index}`} scope="col" className="py-3 px-6 whitespace-nowrap">
								{item.heading}
							</th>
						))}
						{useAction && <th scope="col" className="py-3 px-6 whitespace-nowrap">Action</th>}
					</tr>
				</thead>
				<tbody>
					{data.map((item, index) => (
						<tr key={`tr-${index}`} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
							{column.map((dt, idx) => (
								<td key={`td-${idx}`} className="py-4 px-6 whitespace-nowrap">
									{item[dt.keyValue] ? item[dt.keyValue]?.toString() : ''}
								</td>
							))}
							{useAction && (
								<td className="py-4 px-6">
									<div className="flex items-center gap-x-2">
										<button onClick={() => navigate(`${urlEdit}/${item?.id}`)} className="text-blue-500 hover:text-blue-700 focus:outline-none">
											Edit
										</button>
										<button onClick={onDelete} className="text-red-500 hover:text-red-700 focus:outline-none">
											Delete
										</button>
									</div>
								</td>
							)}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
};

export default Table;