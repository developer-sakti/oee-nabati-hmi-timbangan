import React, { useContext } from 'react';
import { Select, MessageBox, DatePicker, Layout } from 'element-react';
import { Context } from '../context/reducers';
import api from '../helpers/api';
import moment from 'moment-timezone';

const Info = () => {
    const { store, dispatch } = useContext(Context);

    const productionPlanningNotFound = () => {
        MessageBox.alert(`There are no active PO on the selected shift or line.`);
    }

    const selectLine = (line_id) => {
        api.API_MAIN.get(`rencana-produksi/find/shift?date=${moment(store.selectedDate).format(`YYYY-MM-DD`)}&shift_id=${store.selectedShift}&line_id=${line_id}`, {
            headers: {
                'Authorization': `bearer ${localStorage.getItem('token')}`
            }
        })
            .then(({ data }) => {
                if (data.length > 0) {
                    dispatch({ type: 'set_pros', value: data })
                } else {
                    productionPlanningNotFound();
                    dispatch({ type: 'clear_input' });
                }
            })
            .catch(err => {
                console.error(err);
                productionPlanningNotFound();
                dispatch({ type: 'clear_input' });
            });

        dispatch({ type: 'set_selected_line', value: line_id });
    }

    return (
    <React.Fragment>
    <div>
        <div className="font-bold">Date</div>
        <div>
            <DatePicker
                value={store.selectedDate}
                placeholder="Pick a day"
                onChange={date=>dispatch({ type: 'set_selected_date', value: date })}
                disabledDate={time=>(time.getTime() < moment().subtract(2, 'days') || time.getTime() > moment().subtract(0, 'days')) }
            />
        </div>
    </div>
    <Layout.Row>
        <Layout.Col span="8">
            <div className="font-bold">Shift</div>
            <div>
                <Select disabled={!store.selectedDate} placeholder="Select shift" size="large" value={store.selectedShift} 
                    onChange={e => dispatch({ type: 'set_selected_shift', value: e })}
                    loading={store.shifts.length < 1}>
                    {
                        store.shifts.map(el => {
                            return <Select.Option key={el.id} label={el.shift_name} value={el.id} />
                        })
                    }
                </Select>
            </div>
        </Layout.Col>
        <Layout.Col span="8">
            <div className="ml-2">
                <div className="font-bold">Line</div>
                <div>
                    <Select disabled={!store.selectedShift} placeholder="Select line" size="large" value={store.selectedLine} 
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
        </Layout.Col>
    </Layout.Row>
    <Layout.Row>
        <Layout.Col span="8">
            <div className="font-bold">IO</div>
                <div>
                    <Select disabled={store.pros.length < 1} placeholder="Select IO" size="large" value={store.selectedPro} 
                        onChange={e => {
                            dispatch({ type: 'set_selected_pro', value: e })
                        }}
                        loading={store.pros.length < 1}>
                        {
                            store.pros.map(el => {
                                return <Select.Option key={el.id} label={el.po_number} value={el.id} />
                            })
                        }
                    </Select>
                </div>
        </Layout.Col>
        <Layout.Col span="8">
            <div className="ml-2">
                <div className="font-bold">Machine</div>
                <div>
                    <Select disabled={!store.selectedPro} placeholder="Select mesin" size="large" value={store.selectedMachine} 
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
        </Layout.Col>
    </Layout.Row>
    <div>
        <div className="font-bold">Category</div>
        <div>
            <Select disabled={!store.selectedMachine} placeholder="Select kategori" size="large" value={store.selectedCategory} 
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