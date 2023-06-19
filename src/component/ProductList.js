import React, { useEffect, useState } from 'react';
import './ProductList.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import commentExpand from '../assets/expandComment.png';
import commentIcon from '../assets/commentIcon.png';
import forwardButton from '../assets/noteSub.png';
import userPic from '../assets/user.png';
import emailPic from '../assets/email.png';
import mobilePic from '../assets/mobile.png';
import passwordPic from '../assets/password.png';

const ProductList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loginPopUp, setLoginPopUp] = useState(false)
  const [editpart, setEditpart] = useState(false)
  const [filters, setFilters] = useState({
    All: ''
  });
  const [sortOption, setSortOption] = useState('');
  const [Id, setid] = useState();

  const [jobList, setJobList] = useState([]);
  const [votedJobs, setVotedJobs] = useState([]);
  const [isOpenArray, setIsOpenArray] = useState([]);
  const [todoItems, setTodoItems] = useState([]);
  const [inputValues, setInputValues] = useState([]);

  const navigate = useNavigate("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");

  const [companyName, setCompanyName] = useState("");
  const [companyLogoURL, setCompanyLogoURL] = useState("");
  const [productCatogary, setProductCatogary] = useState("");
  const [aboutCompany, setAboutCompany] = useState("");
  const [productLink, setProductLink] = useState("");

  const auth = localStorage.getItem("user");

  const handleButtonClick = () => {
    setIsOpen(true);
  };
  const loginPopup = () => {
    setLoginPopUp(true)
  }

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleJobForm = async () => {
    const productCatogaryString = productCatogary.join(", ");
    console.log(companyName, companyLogoURL, productCatogaryString, productLink, aboutCompany);

    let result = await fetch('https://deshing-doc.onrender.com/addJob', {
      method: "post",
      body: JSON.stringify({ companyName, companyLogoURL, productCatogary: productCatogaryString, productLink, aboutCompany }),
      headers: {
        "content-type": "application/json"
      }
    });
    result = await result.json();
    console.log(result);
    setCompanyName("");
    setCompanyLogoURL("");
    setProductCatogary("");
    setProductLink("");
    setAboutCompany("");
    setIsOpen(false);
    window.location.reload();

  };

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const collectData = async () => {
    console.log(name, email, number, password);

    let result = await fetch('https://deshing-doc.onrender.com/register', {
      method: "post",
      body: JSON.stringify({ name, email, number, password }),
      headers: {
        "content-type": "application/json"
      }
    });
    result = await result.json();
    console.log(result);
    if (result) {
      navigate("/");
      setIsOpen(false);
    }
    localStorage.setItem('user', JSON.stringify(result));
  };

  useEffect(() => {
    getJobs();
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [filters, sortOption]);

  const getJobs = async () => {
    try {
      const response = await fetch('https://deshing-doc.onrender.com/jobs');
      const result = await response.json();
      setJobList(result);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await axios.get('https://deshing-doc.onrender.com/jobs', {
        params: { ...filters, sortOption }
      });
      setJobList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };


  const handleVote = async (jobId, index) => {
    if (votedJobs.includes(jobId)) {
      console.log('Already voted for this job.');
      return;
    }

    try {
      const updatedJobList = [...jobList];
      const updatedVoteCount = updatedJobList[index].upVotes + 1;
      updatedJobList[index].upVotes = updatedVoteCount;
      setJobList(updatedJobList);
      setVotedJobs((prevVotedJobs) => [...prevVotedJobs, jobId]);

      await axios.post(`https://deshing-doc.onrender.com/jobs/${jobId}/vote`, { upVotes: updatedVoteCount });

      console.log('Vote count updated successfully');
    } catch (error) {
      console.error('Error updating vote count:', error);
    }
  };

  useEffect(() => {
    setIsOpenArray(new Array(jobList.length).fill(false)); // Initialize isOpenArray with false values
  }, [jobList]);


  const handleToggleExpand = (index) => {
    setIsOpenArray((prevArray) => {
      const newArray = [...prevArray];
      newArray[index] = !newArray[index]; // Toggle the state of the specific accordion content
      return newArray;
    });
  };




  useEffect(() => {
    const storedTodoItems = localStorage.getItem('todoItems');
    if (storedTodoItems) {
      setTodoItems(JSON.parse(storedTodoItems));
    }
  }, []);

  const handleInputChange = (event, index) => {
    const updatedInputValues = [...inputValues];
    updatedInputValues[index] = event.target.value;
    setInputValues(updatedInputValues);
  };

  const handleAddTodo = async (event, index) => {
    if (event.key === 'Enter') {
      if (inputValues[index].trim() !== '') {
        try {
          const response = await axios.post(
            `https://deshing-doc.onrender.com/todoText/${jobList[index]._id}`,
            { productComment: inputValues[index].trim() }
          );
          console.log(response.data);
          const updatedTodoItems = [...todoItems];
          if (!Array.isArray(updatedTodoItems[index])) {
            updatedTodoItems[index] = [];
          }
          updatedTodoItems[index] = [inputValues[index].trim(), ...updatedTodoItems[index]];
          setTodoItems(updatedTodoItems);
          const updatedInputValues = [...inputValues];
          updatedInputValues[index] = '';
          setInputValues(updatedInputValues);
          localStorage.setItem('todoItems', JSON.stringify(updatedTodoItems));
          window.location.reload();

        } catch (error) {
          console.error('Error adding todo:', error);
        }
      }
    }
  };

  const handleTextForward = async (event, index) => {
    if (inputValues[index].trim() !== '') {
      try {
        const response = await axios.post(
          `https://deshing-doc.onrender.com/todoText/${jobList[index]._id}`,
          { productComment: inputValues[index].trim() }
        );
        console.log(response.data);
        const updatedTodoItems = [...todoItems];
        if (!Array.isArray(updatedTodoItems[index])) {
          updatedTodoItems[index] = [];
        }
        updatedTodoItems[index] = [inputValues[index].trim(), ...updatedTodoItems[index]];
        setTodoItems(updatedTodoItems);
        const updatedInputValues = [...inputValues];
        updatedInputValues[index] = '';
        setInputValues(updatedInputValues);
        localStorage.setItem('todoItems', JSON.stringify(updatedTodoItems));
        window.location.reload();

      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

    
  
  
  

  useEffect(() => {
    const auth = localStorage.getItem("user")
    if (auth) {
      navigate("/")
    }

  })

  const handleLogin = async (e) => {
    console.log(email, password);

    let result = await fetch('https://deshing-doc.onrender.com/login', {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "content-type": "application/json"
      }
    })
    result = await result.json();
    console.log(result);
    if (result) {
      navigate("/")
      setLoginPopUp(false)
      setIsOpen(false)

    }
    localStorage.setItem('user', JSON.stringify(result))
  }

  const handleEdit = async (_id) => {
    setEditpart(true);
    console.log(_id);
    try {
      let response = await axios.get(`https://deshing-doc.onrender.com/editProduct/${_id}`);
      setid(response.data._id)

      console.log(response.data.companyName);
      setCompanyName(response.data.companyName);
      setCompanyLogoURL(response.data.companyLogoURL);
      setProductCatogary(response.data.productCatogary);
      setProductLink(response.data.productLink);
      setAboutCompany(response.data.aboutCompany);

    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdate = async () => {
    console.log(Id);
    try {
      const response = await axios.put(`https://deshing-doc.onrender.com/editProduct/${Id}`, {
        companyName: companyName,
        companyLogoURL: companyLogoURL,
        productCatogary: productCatogary,
        productLink: productLink,
        aboutCompany: aboutCompany,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // console.log(_id);
      console.log(response.data);
      setEditpart(false);
      navigate("/");
      window.location.reload();

    } catch (error) {
      // console.log("Error:", error.message);
    }
  };

  const handleClose00 = () => {
    setEditpart(false);
  }





  return (
    <div className='productPortion'>
      <div className='sideBarFilter'>
        <p className='appname'>Feedback</p>
        <p className='filterText'>Apply Filter</p>
      </div>
      <p className='filterText2'>Filters:</p>
      <div className="filter">
        <select className='filterPart' id='All' value={filters.All} name='All' onChange={handleFilterChange}>
          <option value="" className='option'>All</option>
          <option value="Fintech" >Fintech</option>
          <option value="Edtech" >Edtech</option>
          <option value="B2B" >B2B</option>
          <option value="Saas" >Saas</option>
          <option value="Agritech" >Agritech</option>
          <option value="Medtech" >Medtech</option>
        </select>
      </div>
      <div className="aboutProduct">
        <p className='textSort1'>Sort By:</p>
        <select className='selection1' value={sortOption} onChange={handleSortChange}>
          <option value=""> Upvote</option>
          <option className='option1' value='lowestPrice'>Upvote : Lowest</option>
          <option className='option1' value='highestPrice'>Upvote : Highest</option>
          <option className='option1' value='productName'>Upvote: (A-Z)</option>
          <option className='option1' value='-productName'>Upvote: (Z-A)</option>

        </select>
        <p className='textSort2'>Sort By:</p>
        <select className='selection2' value={sortOption} onChange={handleSortChange}>
          <option value=''> Comment</option>
          <option className='option1' value='highestPrice'>Comment : Lowest</option>
          <option className='option1' value='lowestPrice'>Comment : Highest</option>
          <option className='option1' value='-productName'>Comment: (A-Z)</option>
          <option className='option1' value='productName'>Comment: (Z-A)</option>

        </select>
        <button className='addProduct' onClick={handleButtonClick}>+ Add product</button>
        {isOpen && (
          <div className="modal">
            <div className="overLay">

              {auth ? (
                <>
                  <span className="close" onClick={handleClose}>
                    ❌
                  </span>
                  <div className="popUp">
                    <div className='part1'>
                      <p className='addProductTextUp'>Add your product </p>
                      <input type='text' value={companyName} placeholder='Name of the Company' className='inputUp1' onChange={(e) => setCompanyName(e.target.value)} /><br />
                      <input type='text' value={companyLogoURL} placeholder='Add logo url ' className='inputUp2' onChange={(e) => setCompanyLogoURL(e.target.value)} /><br />
                      <input type='text' value={productCatogary.length > 0 ? productCatogary.join(", ") : ""} placeholder='Catogary' className='inputUp3' onChange={(e) => setProductCatogary(e.target.value.split(/,\s*/))} /><br />
                      <input type='text' value={productLink} placeholder='Link of product' className='inputUp4' onChange={(e) => setProductLink(e.target.value)} /><br />
                      <input type='text' value={aboutCompany} placeholder='Add description' className='inputUp5' onChange={(e) => setAboutCompany(e.target.value)} /><br />
                      <button type='submit' className='addButtonUp' onClick={handleJobForm}>+ Add</button>
                    </div>
                    <div className='part2'>
                      <p className='nameApp'>Feedback</p>
                      <p className='nameAppText'>Add your product and rate other items.............</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className='singupPop'>
                    <div className="div1">
                      <p className='addProductText33'>Signup to continue</p>
                      <img src={userPic} className='userPic1' alt='' />
                      <input type='text' value={name} placeholder='Name' className='inputS1' onChange={(e) => setName(e.target.value)} /><br />
                      <img src={emailPic} className='emailPic1' alt='' />
                      <input type='email' value={email} placeholder='Email' className='inputS3' onChange={(e) => setEmail(e.target.value)} /><br />
                      <img src={mobilePic} className='mobilePic1' alt='' />
                      <input type='text' value={number} maxLength={10} placeholder='Mobile' className='inputS2' onChange={(e) => setNumber(e.target.value)} /><br />
                      <img src={passwordPic} className='passwordPic1' alt='' />
                      <input type='password' value={password} placeholder='Password' className='inputS4' onChange={(e) => setPassword(e.target.value)} /><br />
                      <p className='textStyleS'>Already have an account?</p>
                      <Link className='forwardLinkS' onClick={loginPopup}>Login</Link>
                      <button type='submit' className='addButtonS' onClick={collectData}>Signup</button>
                    </div>
                    <div className="div2">
                      <p className='nameApp'>Feedback</p>
                      <p className='nameAppText'>Add your product and rate other items.............</p>
                      {/* Nested pop-up */}
                      {loginPopUp && (
                        <div className="modal">
                          <div className="overLay">
                            <div className="loginPop">
                              <div className="box1">
                                <p className='addProductText1'>Log in to continue</p>
                                <img src={emailPic} className='emailClass' alt='' />
                                <input type='email' value={email} placeholder='Email' className='inputL1' onChange={(e) => setEmail(e.target.value)} /><br />

                                <img src={passwordPic} className='mobileClass' alt='' />
                                <input type='password' value={password} placeholder='Password' className='inputL2' onChange={(e) => setPassword(e.target.value)} /><br />
                                <button type='submit' className='addButtonL' onClick={handleLogin} >Log in</button>

                              </div>
                              <div className="box2">
                                <p className='nameApp'>Feedback</p>
                                <p className='nameAppText'>Add your product and rate other items.............</p>

                              </div>


                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

            </div>
          </div>
        )}
      </div>

      {jobList && jobList.length > 0 ? (
        jobList.map((item, index) => (
          <ul className="jobFormate" key={index}>
            <img src={item.companyLogoURL} className="logo" alt="" />
            <p className="companyName">{item.companyName}</p>
            <p className="aboutText">{item.aboutCompany}</p>
            <div className="productCatogary">
              {item.productCatogary && item.productCatogary.length > 0 ? (
                <div className="productCatogary">
                  {item.productCatogary.map((category, catIndex) => (
                    <p key={catIndex} className="catogaryItem">
                      {category}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="comment">
              <img
                src={commentExpand}
                className="commentExpand"
                onClick={() => handleToggleExpand(index)} // Update the onClick event
                alt=""
              />
              <p className="commentText">Comment</p>
            </div>
            <p className='inputValuesCount'>{item.commentsCount}</p>
            <img src={commentIcon} className="commentIcon" alt="" />
            <div className="upvotes">
              <p
                className="incresingVote"
                onClick={() => handleVote(item._id, index)}
              >
                ^
              </p>
              <p className="showVote">{item.upVotes}</p>
            </div>

            {auth ? (
              <>
                <Link className="editJob" id={item._id} onClick={() => handleEdit(item._id)}>
                  Edit
                </Link>
              </>
            ) : null}

            {isOpenArray[index] && (
              <div className="accordionContent">
                <input type='text' className='inputText' value={inputValues[index]} id='item' autoFocus placeholder='Add a comment.....'
                  onKeyUp={(event) => handleAddTodo(event, index)}
                  onChange={(event) => handleInputChange(event, index)}
                />
                <img src={forwardButton} className='forwardButton' alt='' onClick={(event) => handleTextForward(event, index)} />

                <ul id="todoBox" className='todoBox'>
                {Array.isArray(todoItems[index]) &&
              todoItems[index].map((item, todoIndex) => (
                <li key={todoIndex} className="liDot">
                  {item}
                </li>
              ))}
                </ul>

              </div>
            )}
          </ul>
        ))
      ) : (
        <p className="noJobFound">😔Oops, no jobs found.</p>
      )}

      {editpart && (
        <div className='modal'>
          <div className='overLay'>
            <span className="close00" onClick={handleClose00}>
              ❌
            </span>
            <div className="editPopUp">
              <div className='part1'>
                <p className='addProductText00'>Update your product </p>
                <input type='text' value={companyName} placeholder='Name of the Company' className='input1' onChange={(e) => setCompanyName(e.target.value)} /><br />
                <input type='text' value={companyLogoURL} placeholder='Add logo url ' className='input3' onChange={(e) => setCompanyLogoURL(e.target.value)} /><br />
                <input type='text' value={productCatogary.length > 0 ? productCatogary.join(", ") : ""} placeholder='Catogary' className='input2' onChange={(e) => setProductCatogary(e.target.value.split(/,\s*/))} /><br />
                <input type='text' value={productLink} placeholder='Link of product' className='input4' onChange={(e) => setProductLink(e.target.value)} /><br />
                <input type='text' value={aboutCompany} placeholder='Add description' className='input5' onChange={(e) => setAboutCompany(e.target.value)} /><br />
                <button type='submit' className='addButton11' onClick={handleUpdate}>+ Add</button>
              </div>
              <div className='part2'>
                <p className='nameApp'>Feedback</p>
                <p className='nameAppText'>Update your product and rate other items.............</p>
              </div>
            </div>
          </div>

        </div>
      )}

      <p className='jobLength'>{jobList.length} Suggestions</p>
    </div>
  );
};

export default ProductList;
