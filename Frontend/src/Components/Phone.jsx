import { useNavigate } from "react-router-dom";
import API from "../url";

export function Phone({ data ,getAllMobilesFn}) {
  const navigate = useNavigate();
  
  const handleDelete = (id) =>{
    fetch(`${API}/mobiles/${id}`,{
      method:"DELETE",
      headers:{
        'x-Auth-token':localStorage.getItem("x-Auth-token"),
        'x-Auth-roleId':localStorage.getItem("roleId"),
      }
    })
    .then((response) => {
      if (response.status === 401) {
        throw new Error(response.statusText);
      }
        return response.json();
    })
    .then((mbs)=>{
      getAllMobilesFn()
    })
    .catch((err)=>{
      console.log(err);
     navigate('/');
     localStorage.clear()
    })
  }

  return (
    <div className='phone-list-container'>
      {data.map((data) => (
        <div className='phone-container' key={data._id}>
          <img className='phone-picture' src={data.img} />
          <h2 className='phone-name'>{data.model}</h2>
          <p className='phone-company'>{data.company}</p>
          {localStorage.roleId === '1'? <button onClick={()=>handleDelete(data._id)}>Button</button> : <div></div>}
        </div>
      ))}
    </div>
  );
}
