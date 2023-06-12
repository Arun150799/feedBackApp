import React, { useState, useEffect } from 'react'
import './Edit.css';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
    const [companyName, setCompanyName] = useState("");
    const [companyLogoURL, setCompanyLogoURL] = useState("");
    const [productCatogary, setProductCatogary] = useState("");
    const [aboutCompany, setAboutCompany] = useState("");
    const [productLink, setProductLink] = useState("");
    const params = useParams()
    const naviagte=  useNavigate()

    useEffect(() => {
        getUpdate()
    }, [])

    const getUpdate = async () => {
        // console.log(param);
        let result = await fetch(`http://localhost:6600/editJob/${params.id}`);
        result = await result.json();
        console.log(result);
        setCompanyName(result.companyName);
        setCompanyLogoURL(result.companyLogoURL);
        setProductCatogary(result.productCatogary);
        setProductLink(result.productLink);
        setAboutCompany(result.aboutCompany);

    }

     const updateData=async()=>{
        let result = await fetch(`http://localhost:6600/editJob/${params.id}`,{
            method:"put",
            body:JSON.stringify({companyName, companyLogoURL,productCatogary,productLink,aboutCompany}),
            headers:{
                'Content-Type':'Application/json'
            }
        })
        result = await result.json()
        console.log(result);

          naviagte("/")
     }

    return (
        <div className='body2'>
            <p className='appName'>Feedback</p>
            <p className='appText'>Update your products and give us your valuable feedback</p>
            <div className='portion1'>
                <input type='text' value={companyName} placeholder='Name of the Company' className='input11' onChange={(e) => setCompanyName(e.target.value)} /><br />
                <input type='text' value={companyLogoURL} placeholder='Add logo url ' className='input22' onChange={(e) => setCompanyLogoURL(e.target.value)} /><br />
                <input type='text' value={productCatogary} placeholder='Catogary' className='input33' onChange={(e) => setProductCatogary(e.target.value)} /><br />
                <input type='text' value={productLink} placeholder='Link of product' className='input44' onChange={(e) => setProductLink(e.target.value)} /><br />
                <input type='text' value={aboutCompany} placeholder='Add discription' className='input55' onChange={(e) => setAboutCompany(e.target.value)} /><br />

                <button type='submit' className='addButton11'  onClick={updateData} >+ Add</button>
                <p className='sideText'> Updating and Sharing</p>

            </div>

        </div>

    )
}

export default Edit
