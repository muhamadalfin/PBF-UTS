import React from "react";

const produkPost = (props) => {
    return (
        <div>
            <div className="produk">
                <div className="row" style={{ width: '50rem', marginTop: '20px' }}>
                    <div className="col-3">
                        <div className="gambar-produk">
                            <img name="gambar" src={props.gambar} />
                        </div>
                    </div>
                    <div className="col-1 solid"></div>
                    <div className="col-8">
                        <div className="konten-produk">
                            <p className="namaProduk" name="namaProduk">Nama Produk : {props.namaProduk}</p>
                            <p className="harga" name="harga">Harga : Rp {props.harga}</p>
                            <p className="stok" name="stok">Jumlah Stok : {props.stok}</p>
                            <button className="btn btn-sm btn-primary" onClick={() => props.tambahProduk(props.idProduk)}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default produkPost;