import React, { useContext, useEffect } from 'react';
import { Button, Message, MessageBox } from 'element-react';
import { Context } from '../context/reducers';

const Weight = () => {
    const { store, dispatch } = useContext(Context);
    const confirm = () => {
        let machine = store.machines.filter(x => x.id === store.selectedMachine)[0].name;
        let line = store.lines.filter(x => x.id === store.selectedLine)[0].name;
        let category = store.categories.filter(x => x.id === store.selectedCategory)[0].category;

        MessageBox.confirm(`Dengan ini akan dikirimkan data sebagai berikut: Mesin ${machine}, ${line}, Kategori ${category}, dan Berat ${store.weight} Kg. apakah sudah benar ?`, 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Batal',
            type: 'warning'
        }).then(() => {
            Message({
                type: 'success',
                message: 'Berhasil dikirim!'
            });
            
            dispatch({ type: 'clear_input' });
        }).catch(() => {
            Message({
                type: 'info',
                message: 'Dibatalkan'
            });
        });
    }

    useEffect(() => {
    }, [])

    return (
        <React.Fragment>
        <div className="ml-4">
            <div className="font-bold">Berat (Kg)</div>
            <div className="p-2 w-4/5 text-2xl text-center border font-bold h rounded border-gray-500">
                {store.weight}
            </div>
            <div className="mt-2">
                <Button type="warning" size="large"
                    icon="circle-check"
                    className="w-4/5" onClick={confirm} 
                    disabled={!store.selectedMachine || !store.selectedLine || !store.selectedCategory}>Kirim</Button>
            </div>
        </div>
        </React.Fragment>
    );
};

export default Weight;