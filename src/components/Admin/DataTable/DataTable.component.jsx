import React from "react";

import styles from './DataTable.module.css';
import RowData from "./RowData/RowData.component";


export default function DataTable({setViewModal, stockItems, setRefresh, setDataStock}) {

  function handleAdd() {
    setViewModal(true);
    setRefresh((refresh) => !refresh);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        Produtos do Estoque
      </div>
      <div className={styles.btnContent}>
        <button type="button" className={styles.button} onClick={handleAdd}>Adicionar</button>
      </div>
      <div className={styles.contentData}>
        <div className={styles.contentTable}>
          <div className={styles.tableHeader}>
            <table className={styles.table}>
              <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Quantidade</th>
                    <th>Categoria</th>
                    <th>Data</th>
                    <th>Última compra</th>
                    <th width="40" style={{backgroundColor: 'transparent'}}></th>
                    <th width="40" style={{backgroundColor: 'transparent'}}></th>
                  </tr>
                </thead>
            </table>
          </div>
          <div className={styles.tableBody}>
            <table className={styles.table}>
              <tbody>
                {
                  stockItems.map((data) => 
                  <RowData
                    key={data.id_stock}
                    id={data.id_stock}
                    name={data.name}
                    quantity={data.qty}
                    category={data.category_stock}
                    date_buy={data.dt_buy}
                    date_last_buy={data.dt_last_buy}
                    setRefresh={setRefresh}
                    setViewModal={setViewModal}
                    setDataStock={setDataStock}
                  />)
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}