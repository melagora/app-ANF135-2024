export default function Footer() {
  return (
    <footer>
      <div className="integrantes">
        <ul>
          <div className="integrantes2">
          <div>
            {" "}
            <li>INTEGRANTES: </li>
          </div>
          <div>
            {" "}
            <li>Carlos Garcia</li>
          </div>
          <div>
            {" "}
            <li>Melvin González</li>
          </div>
          <div>
            {" "}
            <li>Javier Pimentel</li>
          </div>
          </div>
          
        </ul>
        <h5>&copy; {new Date().getFullYear()} ANÁLISIS FINANCIERO 2024</h5>
      </div>
    </footer>
  );
}
