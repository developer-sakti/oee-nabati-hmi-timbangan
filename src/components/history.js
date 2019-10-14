import React, { useContext } from "react";
import { Context } from "../context/reducers";
import moment from "moment-timezone";

const History = () => {
	const { store } = useContext(Context);

	return (
		<React.Fragment>
			<div className="rounded overflow-auto mt-2 h-64 p-2 border border-blue-600 w-full">
				{store.histories.map((d, i) => (
					<div key={i} className="mb-2 border-b-2 border-blue-600">
						<table className="m-0 p-0">
							<tbody>
								<tr>
									<td>{i + 1}.</td>
									<td>{d.machine.name}</td>
									<td>|</td>
									<td>{d.badstock_category.category}</td>
								</tr>
								<tr>
									<td></td>
									<td>
										{
											store.lines.filter(
												x => x.id === d.rencana_produksi.lineId
											)[0].name
										}
									</td>
									<td>|</td>
									<td>{d.weight_kg + " Kg"}</td>
								</tr>
								<tr>
									<td></td>
									<td>
										{moment(d.created_at)
											.tz("utc")
											.format("DD MM YYYY")}
									</td>
									<td>|</td>
									<td>
										{moment(d.created_at)
											.tz("utc")
											.format("HH:mm:ss")}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				))}
			</div>
		</React.Fragment>
	);
};

export default History;
