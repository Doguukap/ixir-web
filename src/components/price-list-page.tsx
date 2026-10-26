import SiteHeader from "./site-header";
import Footer from "./footer";
import { priceList } from "@/lib/price-list";

export default function PriceListPage() {
  return <><SiteHeader/><main className="price-list-page"><div className="price-list-shell">
    <header className="price-list-heading"><span aria-hidden="true">»</span><h1 id="price-list-title">Fiyat Listesi</h1></header>
    <table className="price-list-table" aria-labelledby="price-list-title"><thead><tr><th scope="col">Hizmet</th><th scope="col">Fiyat</th></tr></thead><tbody>{priceList.map(item => <tr key={item.service}><th scope="row">{item.service}</th><td><span className="price-list-amount">{item.price}</span>{item.from && <span className="price-list-from"> ’den başlayan fiyatlar</span>}</td></tr>)}</tbody></table>
  </div></main><Footer language="tr"/></>;
}
