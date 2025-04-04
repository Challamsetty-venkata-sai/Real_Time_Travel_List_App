
import {useState} from 'react'
export function App(){
    
    const [items,setitems]=useState([]);
    const [quantity,setquantity]=useState(1);
    const [description,setdescription]=useState("");
   
    
    function HandlingSubmit(e)
    {
        e.preventDefault(); 
       const newitem=
       { 
        quantity,
        description,
        id:Date.now(),
        packed:false,
        }
        items.push(newitem);
      
       setquantity(1);
       setdescription("");
       
    }
    function HandlingNumber(e){
        setquantity(Number(e.target.value));

    }
    function HandlingText(e){
        setdescription(e.target.value)

    }
    function HandlingDeletionItem(id){
        setitems((items)=>items.filter((item)=>item.id !==id));

    }
    function HandlingClearingItems(){
        setitems([]);

    }
    function HandlingChecked(e,id)
    {
        console.log(id);
        console.log(e.target.checked)
       
        setitems((previtems)=>previtems.map(item=>item.id===id ? {...item,packed:e.target.checked}: item));
        
        
      
    }
    return (
        <div className="container box">
            <div className="header box">
                <Header/>
            </div>
            <div className="form box">
                <Form number={quantity} text={description} onsubmit={HandlingSubmit} onnumber={HandlingNumber} ontext={HandlingText}/>
            </div>
            <div className="packinglist box">
                <PackingList items={items} ondeletion={HandlingDeletionItem} onclearing={HandlingClearingItems}  onchecking={HandlingChecked}/>
            </div>
            <div className="footer box"> 
                <Footer items={items}/>
            </div>

        </div>
    )
}
function Header(){
  return (
    <h1 style={{fontSize:'45px',letterSpacing:"10px",color:'black'}}>🌴FAR AWAY 💼</h1>
  )
}
const id=[1,2,3,4,5];
function Form({number,text,onsubmit,onnumber,ontext}){
   
    
    return (
        <div className="forminner">
            <h2>What do you need for your 😍trip</h2>
            <form onSubmit={(e)=>onsubmit(e)} style={{display:"flex",justifyContent:"center",columnGap:"10px"}} >
                <select style={{width:"80px",height:"40px",borderRadius:"20px"}} value={number} onChange={(e)=>onnumber(e)} >
                    
                    {
                        id.map((num)=>(
                            <option key={num} value={num}>{num}</option>
                        ))
                    }

                </select>
                <input type="text" style={{borderRadius:"20px",textAlign:"center"} } placeholder='Text'  value={text} onChange={(e)=>ontext(e)}></input>
                <button style={{width:"80px",backgroundColor:"green",borderRadius:"20px",color:"white"}}>ADD</button>
                
            </form>
        </div>
    )

}
function PackingList({items,ondeletion,onclearing,onchecking}){
    let tempItems=[];
    const [userSelection, setUserSelection] = useState("Based on the input");

    function HandlingSelect(e) {
        setUserSelection(e.target.value);  // Updates state correctly
    }
    if(userSelection==="Based on the input"){
        tempItems=items;
        console.log(tempItems);
    }
    else if(userSelection==="Based on the description"){
        tempItems=items.slice().sort((a,b)=>a.description.localeCompare(b.description));
        console.log(tempItems)
    }
    else if(userSelection==="Based on the Quantity"){
        tempItems=items.slice().sort((a,b)=>a.quantity-b.quantity)
    }
    else {
        tempItems=items.slice().sort((a,b)=>a.packed-b.packed);
    }
    return (
        <>
       
        <div className="addeditems">
            {
                tempItems.map((item)=>(
                    <div className='item' key={item.id}>
                        <input type="checkbox" onChange={(e)=>onchecking(e,item.id)} ></input>
                        <p style={{ textDecoration: item.packed ? 'line-through' : 'none' }}>{item.quantity} {item.description}</p>
                        <button onClick={()=>ondeletion(item.id)}>❌</button>

                    </div>
                ))
            }

          
        </div>
         <div className="sorteditems">

             <form>
                <select style={{width:"200px",height:"50px",borderRadius:"20px",textAlign:"center"}} placeholder="Based on the input" onChange={(e)=>HandlingSelect(e)}>
                    <option value="Based on the input">Based on the input</option>
                    <option value="Based on the Quantity">Based on the Quantity</option>
                    <option value="Based on the description">Based on the description</option>
                    <option value="Based on the marked">Based on the marked</option>
                </select>
             </form>
            <button onClick={()=>onclearing()}>Clear List</button>
         </div>
       
        
        </>
    )
}
function Footer({items}){
    return (
            <>
            {
            items.length===0 ? (<h2>Start Adding some Items to Your Packing List</h2>):(<h2>Total Added items is {items.length}</h2>)
             }
            </>
        
    )
}