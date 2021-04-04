import React, { Component, handleTambahProduk, handleTombolSimpan, state, ambilDataDariServerAPI, handleHapusProduk } from "react";
import './Produk.css';
import ProdukPost from "./ProdukPost";

class produk extends Component {
    state = {
        listProduk: [],
        insertProduk: {
            userId: 1,
            id: 1,
            namaProduk: "",
            stok: "",
            harga: "",
            gambar: ""
        }
    }

    ambilDataDariServerAPI = () => {
        fetch(`http://localhost:3001/posts?_sort=id&_order=desc`)
            .then(response => response.json())
            .then(jsonHasilDariAPI => {
                this.setState({
                    listProduk: jsonHasilDariAPI
                })
            })
    }

    componentDidMount() {
        this.ambilDataDariServerAPI()
    }

    handleHapusProduk = (data, res) => {
        fetch(`http://localhost:3001/posts/${data}`, { method: 'DELETE' })
            .then(res => {
                this.ambilDataDariServerAPI()
            });

        fetch(`http://localhost:3001/posts/${data}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: res["id"],
                namaProduk: res["namaProduk"],
                harga: res["harga"],
                gambar: res["gambar"],
                stok: res["qty"]
            })
        });
    }

    handleTambahProduk = (data) => {
        fetch(`http://localhost:3001/posts/${data}`, { methode: 'GET' })
            .then(response => response.json())
            .then(res => {
                var produkRiceCooker = { ...this.state.insertProduk };
                produkRiceCooker["id"] = res["id"];
                produkRiceCooker["namaProduk"] = res["namaProduk"];
                produkRiceCooker["gambar"] = res["gambar"];
                produkRiceCooker["harga"] = res["harga"];
                produkRiceCooker["qty"] = 1;
                this.setState({
                    insertProduk: produkRiceCooker
                });
            })
            .then(() => {
                this.handleCekKeranjang(data);
            })
            .then(() => {
                this.handleTombolSimpan();
            })
    };

    handleCekKeranjang = data => {
        fetch(`http://localhost:3002/posts/${data}`, { method: "GET" }).then(
            response => {
                if (response.ok) {
                    response.json().then(res => {
                        this.handleUpdateKeranjang(data, res);
                        this.ambilDataDariServerAPI();
                    });
                } else {
                    this.handleTombolSimpan();
                }
            }
        );
    };

    handleUpdateKeranjang = (data, res) => {
        fetch(`http://localhost:3002/posts/${data}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: res["id"],
                namaProduk: res["namaProduk"],
                harga: res["harga"],
                gambar: res["gambar"],
                qty: res["qty"] + 1
            })
        });
    };

    handleTambahProdukKeranjang = (event) => {
        let formInsertProduk = { ...this.state.insertProduk };
        //let timestamp = new Date().getTime();
        //formInsertProduk['id'] = idProduk;
        formInsertProduk[event.target.name] = event.target.value;
        this.setState({
            insertProduk: formInsertProduk
        });
    }

    handleTombolSimpan = () => {
        fetch('http://localhost:3002/posts', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.insertProduk)
        })
            .then((Response) => {
                this.ambilDataDariServerAPI();
            });
    }

    render() {
        return (
            <div className="post-Produk">
                <h2 style={{ textAlign: 'center', marginTop: '20px', marginBottom: '50px' }}></h2>
                {
                    this.state.listProduk.map(Produk => {
                        return <ProdukPost key={Produk.id}
                            namaProduk={Produk.namaProduk}
                            gambar={Produk.gambar}
                            harga={Produk.harga}
                            idProduk={Produk.id}
                            stok={Produk.stok}
                            qty={Produk.qty}
                            tambahProduk={this.handleTambahProduk}
                            tombolSimpan={this.handleTombolSimpan} />

                    })
                }
            </div>
        )
    }
}

export default produk;