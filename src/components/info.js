import React, { useContext } from 'react';
import { Select } from 'element-react';
import { Context } from '../context/reducers';

const Info = () => {
    const { store, dispatch } = useContext(Context);

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
                onChange={e => dispatch({ type: 'set_selected_line', value: e })}
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