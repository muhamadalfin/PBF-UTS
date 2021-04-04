import React from "react";

const keranjangPost = (props) => {
    return (
        <div className="listKeranjang">
            <tr>
                <th scope="col-1">No</th>
                <th scope="col-2">Id Produk</th>
                <th scope="col-2">Gambar</th>
                <th scope="col-4">Nama</th>
                <th scope="col-2">Harga</th>
                <th scope="col-1">Qty</th>
                <th scope="col-1">Sub Total</th>
                <th scope="col-1">Action</th>
            </tr>
            <tr>
                <td scope="col">#</td>
                <td scope="col-1"><p className="idProduk" name="idProduk">{props.idProduk}</p></td>
                <td scope="col-1"><p className="gambar" name="gambar"><img name="gambar" src={props.gambar} style={{ width: '70px', height: '40px' }} /></p></td>
                <td scope="col-1"><p className="namaProduk" name="namaProduk">{props.namaProduk}</p></td>
                <td scope="col-1"><p className="harga" name="harga">Rp{props.harga}</p></td>
                <td scope="col-1"><p className="stok" name="stok">{props.qty}</p></td>
                <td scope="col-1"><p className="total" name="totalProduk">{props.harga * props.qty}</p></td>
                <td scope="col-1"><button className="btn btn-sm btn-primary" onClick={() => props.hapusProdukKeranjang(props.idProduk)}>Hapus</button></td>
            </tr>
        </div>
    )
}
export default keranjangPost;