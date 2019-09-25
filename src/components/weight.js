import React, { useContext, useEffect } from 'react';
import { Button, Message, MessageBox } from 'element-react';
import { Context } from '../context/reducers';
import io from 'socket.io-client';
import api from '../helpers/api';
import moment from 'moment-timezone';

const socket = io('http://localhost:9552');

const Weight = () => {
    const { store, dispatch } = useContext(Context);

    const getHistory = (token) => {
        api.API_MAIN.get(`badstock/timbangan/history?date=${moment().format('YYYY-MM-DD')}`, {
            headers: {
            'Authorization': `bearer ${token}`
            }
        })
            .then(res => dispatch({ type: 'set_histories', value: res.data }))
            .catch(err => console.err(err));
        }

    const confirm = () => {
        let machine = store.machines.filter(x => x.id === store.selectedMachine)[0].name;
        let line = store.lines.filter(x => x.id === store.selectedLine)[0].name;
        let category = store.categories.filter(x => x.id === store.selectedCategory)[0].category;

        MessageBox.confirm(`Dengan ini akan dikirimkan data sebagai berikut: Mesin ${machine}, ${line}, Kategori ${category}, dan Berat ${store.weight} Kg. apakah sudah benar ?`, 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
        }).then(() => {
            api.API_MAIN.post('badstock/timbangan', {
                "weight_kg": store.weight,
                "rencanaProduksiId": store.selectedPro,
                "machineId": store.selectedMachine,
                "badstockCategoryId": store.selectedCategory
            }).then(res => {
                    if(res.data.success) {
                        Message({
                            type: 'success',
                            message: 'Sent!'
                        });

                        getHistory(localStorage.getItem('token'));
                        
                        dispatch({ type: 'clear_input' });
                    }
                })
                .catch(err => console.error(err));
        }).catch(() => {
            Message({
                type: 'info',
                message: 'Canceled'
            });
        });
    }

    useEffect(() => {
        socket.on('weight_streaming', (msg) => dispatch({ type: 'set_weight', value: msg }));
    }, [dispatch])

    return (
        <React.Fragment>
        <div className="ml-4">
            <div className="font-bold">Weight (Kg)</div>
            <div className="p-2 w-4/5 text-2xl text-center border font-bold h rounded border-gray-500">
                {store.weight}
            </div>
            <div className="mt-2">
                <Button type="warning" size="large"
                    icon="circle-check"
                    className="w-4/5" onClick={confirm} 
                    disabled={!store.selectedMachine || !store.selectedLine || !store.selectedCategory || !store.selectedProductionPlan}>
                        Send
                    </Button>
            </div>
        </div>
        </React.Fragment>
    );
};

export default Weight;