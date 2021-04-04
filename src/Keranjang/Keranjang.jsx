import React, { Component, handleTambahKeranjang, handleTombolSimpan, state, ambilDataDariServerAPI, handleHapusKeranjang } from "react";
import './Keranjang.css';
import KeranjangPost from "./KeranjangPost";

class Keranjang extends Component {
    state = {
        listKeranjang: [],
        insertKeranjang: {
            userId: 1,
            id: 1,
            namaProduk: "",
            stok: "",
            harga: "",
            gambar: ""
        }
    }

    ambilDataDariServerAPI = () => {
        fetch(`http://localhost:3002/posts?_sort=id&_order=desc`)
            .then(response => response.json())
            .then(jsonHasilDariAPI => {
                this.setState({
                    listKeranjang: jsonHasilDariAPI
                })
            })
    }

    componentDidMount() {
        this.ambilDataDariServerAPI()
    }

    handleHapusKeranjang = (data) => {
        fetch(`http://localhost:3002/posts/${data}`, { method: 'DELETE' })
            .then(res => {
                this.ambilDataDariServerAPI()
            })
    }

    handleTambahKeranjang = (event) => {
        let formInsertKeranjang = { ...this.state.insertKeranjang };
        let timestamp = new Date().getTime();
        formInsertKeranjang['id'] = timestamp;
        formInsertKeranjang[event.target.name] = event.target.value;
        this.setState({
            insertKeranjang: formInsertKeranjang
        });
    }

    handleTambahKeranjangKeranjang = (event) => {
        let formInsertKeranjang = { ...this.state.insertKeranjang };
        //let timestamp = new Date().getTime();
        //formInsertKeranjang['id'] = idKeranjang;
        formInsertKeranjang[event.target.name] = event.target.value;
        this.setState({
            insertKeranjang: formInsertKeranjang
        });
    }

    handleTombolSimpan = () => {
        fetch('http://localhost:3002/posts', {
            method: 'POST',
            headers: {
                'Accept': 'applicarion/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.insertKeranjang)
        })
            .then((Response) => {
                this.ambilDataDariServerAPI();
            });
    }

    getTotalSum = () => {
        return Keranjang.reduce(
            (sum, { cost, quantity }) => sum + cost * quantity,
            0
        );
    };

    render() {
        var total = 0;
        return (
            <div className="post-Keranjang">
                {
                    this.state.listKeranjang.map(Keranjang => {
                        return <KeranjangPost key={Keranjang.id}
                            namaProduk={Keranjang.namaProduk}
                            gambar={Keranjang.gambar}
                            qty={Keranjang.qty}
                            harga={Keranjang.harga}
                            idProduk={Keranjang.id}
                            hapusProdukKeranjang={this.handleHapusKeranjang}
                            totalProduk={this.getTotalSum}
                            tambahProduk={this.handleTambahProduk} />
                    })
                }
            </div>
        )
    }
}

export default Keranjang;