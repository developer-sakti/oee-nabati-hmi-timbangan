import React, { useContext } from 'react';
import { Select, MessageBox } from 'element-react';
import { Context } from '../context/reducers';
import api from '../helpers/api';
import moment from 'moment-timezone';

const Info = () => {
    const { store, dispatch } = useContext(Context);

    const productionPlanningNotFound = () => {
        MessageBox.alert(`Tidak ada PO Aktif pada line tersebut`);
    }

    const selectLine = (line_id) => {
        api.API_MAIN.get(`rencana-produksi/active?date=${moment().format(`YYYY-MM-DD`)}&time=${store.time}&line_id=${line_id}`)
            .then(({ data }) => {
                if (data) {
                    dispatch({ type: 'set_selected_production_plan', value: data })
                } else {
                    productionPlanningNotFound();
                }
            })
            .catch(err => {
                console.error(err);
            });

        dispatch({ type: 'set_selected_line', value: line_id });
    }

    return (
    <React.Fragment>
    <div>
        <div className="font-bold">Mesin</div>
        <div>
            <Select placeholder="Pilih mesin" size="large" value={store.selectedMachine} 
                onChange={e => dispatch({ type: 'set_selected_machine', value: e })}
                loading={store.machines.length < 1}>
                {
                    store.machines.map(el => {
                        return <Select.Option key={el.id} label={el.name} value={el.id} />
                    })
                }
            </Select>
        </div>
    </div>
    <div>
        <div className="font-bold">Line</div>
        <div>
            <Select placeholder="Pilih line" size="large" value={store.selectedLine} 
                onChange={e => selectLine(e)}
                loading={store.lines.length < 1}>
                {
                    store.lines.map(el => {
                        return <Select.Option key={el.id} label={el.name} value={el.id} />
                    })
                }
            </Select>
        </div>
    </div>
    <div>
        <div className="font-bold">Kategori</div>
        <div>
            <Select placeholder="Pilih kategori" size="large" value={store.selectedCategory} 
                onChange={e => dispatch({ type: 'set_selected_category', value: e })}
                loading={store.lines.length < 1}>
                {
                    store.categories.map(el => {
                        return <Select.Option key={el.id} label={el.category} value={el.id} />
                    })
                }
            </Select>
        </div>
    </div>
    </React.Fragment>
    );
};

export default Info;