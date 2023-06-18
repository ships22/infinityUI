// import "../../CSS_Components/Navbar.css";

import { useContext } from 'react'

import '../../CSS_Admin/AdminDashBord.css'
//import AdminDashBoardImg from "../../images/sb-admin-2.png";
import { Container } from 'react-bootstrap'

import { AuthContext } from '../../contexts'
function AdminDashBord() {
  const { auth } = useContext(AuthContext)
  console.log('test auth here in admin  :', auth)
  return (
    <Container className='mx-auto'>
      <div>
        {/* <section className="AdminDashBoardImg">
        <img src={AdminDashBoardImg} alt="" />
      </section> */}
        <div className='AdminDroits'>
          <p>
            Les droits administratifs sont des autorisations accordées par les
            administrateurs aux utilisateurs qui leur permettent de créer, de
            supprimer et de modifier des éléments et des paramètres. <br /> Sans
            droits d'administration, utilisateurs pouvent pas effectuer de
            nombreuses modifications du système, telles que les produits, la
            catégorie, les paramètres de disponibilité des produits.
          </p>
        </div>
      </div>
    </Container>
  )
}

export default AdminDashBord
