import React, { useEffect, useState } from 'react'
import spl from '../../assets/spl.jpg'
import Barcode from 'react-barcode';

export default function SplSticker({item}) {
    console.log(item)
    const itemPieces = item.data.Items[0].ItemPiecesResponse;
    const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsZoomed(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div >

    <div className='ms-4'>
    <style>
      {`
        * {
          padding: 0;
          margin: 0;
        }
       
      `}
    </style>
      <div className={isZoomed ? 'zoom-in' : ''} style={{ backgroundColor: '#fefefe', border: '0px solid #888',direction:'ltr', margin: '15px 0'}}>
        <table cellPadding="0" cellSpacing="0" style={{ border: '1px solid black', borderCollapse: 'collapse', width: '360px', height: '550px', margin: '0px 0 0px 0px', padding: '0' }}>
          <tr>
            <td style={{ border: '1px solid black', textAlign: 'center' }}>
              <img src={spl} width="80px" alt="logo" />
            </td>
            <td colSpan="3" style={{ border: '1px solid black' }}>
              <p className='barcode1' style={{textAlign: 'right', marginBottom:0}}>
              <Barcode value={item.data.Items[0].Barcode}/>
              </p>
              {/* <p style={{ paddingLeft: '3px', textAlign: 'center' }}>{item.data.Items[0].Barcode}</p> */}
            </td>
          </tr>
          <tr>
          <td className='p-3' style={{ border: '1px solid black' }} colSpan="2">PieceWieght: <b>{item.weight}</b>  
           </td>
           <td colSpan="3">  PieceDescription: <b> {item.desc} </b></td>
               </tr>
          <tr>
            <td rowSpan="2" style={{ border: '1px solid black' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginLeft: '5px' }}><b></b></h1>
              <h4 style={{ fontSize: '10px', fontWeight: 'bold', marginLeft: '5px' }}>{item.reciver.city}</h4>
            </td>
            <td colSpan="2" style={{ border: '1px solid black' }}>
              <p style={{ marginLeft: '5px', fontSize: '16px' }}>
                {item.marktercode?(<><span>marktercode: </span><b>{item.marktercode}</b></>):''}
                <br />
                {item.paytype?(<><span></span><b>{item.paytype}</b></>):''}
                <br/>
                {item.paytype === "cod"?(<>{item.price?(<><span>price: </span><b>{item.price} SAR</b></>):''}</>):''}
                

                {/* <b>0 SAR</b> */}
              </p>
            </td>
            <td colSpan="1" rowSpan="1" style={{ border: '1px solid black' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginLeft: '5px' }}><b>Zone </b></h1>
              <p style={{ fontSize: '14px', marginLeft: '5px' }}>{item.reciver.city}</p>
            </td>
          </tr>
          {/* <tr>
            <td style={{ border: '1px solid black', paddingLeft: '5px' }}>
              <p>DOM</p>
            </td>
            <td style={{ border: '1px solid black', paddingLeft: '5px' }} colSpan="2">
              <p>Contact Us: </p>
            </td>
          </tr> */}
          <tr>
            <td colSpan="4"  style={{ border: '1px solid black' }}>
              <p className='ms-1' style={{ color: '#000'  }}>
                {/* Services: */}
                {item.createdate?(<><span>Date: </span>{item.createdate.slice(0,15)}</>):''}
              </p>
            </td>
          </tr>
          <tr style={{borderBottom:'solid 1px black'}}>
          <td style={{ color: '#FFF' }} bgcolor="#333333" colSpan="5">
            <p style={{ textAlign: 'center' }}>
            Number of Pieces: <b>{itemPieces?(<span>{itemPieces.length + 1}</span>): 1}</b>
            </p>
            </td>
            </tr>

          {itemPieces && itemPieces.map((piece, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid black' }}>
                <p style={{ verticalAlign: 'middle', float: 'left', marginTop: '8px' }}>PieceWieght: </p>
                <p style={{ verticalAlign: 'middle', float: 'right', fontSize: '28px', marginRight: '4px' }}>
                  {piece.PieceWeight}
                </p>
              </td>
              <td style={{ padding: '0 5px 0 5px', border: '1px solid black' }}>PieceDescription: <br /><b>{piece.PieceDescription}</b></td>
              <td className='barcode2' style={{ padding: '0 5px 0 5px', border: '1px solid black' }}><Barcode value={piece.PieceBarcode} /> </td>
            </tr>
          ))}
          {/* <tr>
            <td style={{ border: '1px solid black' }}>
              <p style={{ verticalAlign: 'middle', float: 'left', marginTop: '8px' }}>Pieces: </p>
              <p style={{ verticalAlign: 'middle', float: 'right', fontSize: '28px', marginRight: '4px' }}>
                {item.data.Items[0].ItemPiecesResponse[0].PieceWeight}
              </p>
            </td>
            <td style={{ padding: '0 5px 0 5px', border: '1px solid black' }}>PieceDescription: <br /><b>{item.data.Items[0].ItemPiecesResponse[0].PieceDescription}</b></td>
            <td style={{ padding: '0 5px 0 5px', border: '1px solid black' }}>PieceBarcode: <br /><b>{item.data.Items[0].ItemPiecesResponse[0].PieceBarcode}</b></td>
            
          </tr> */}
          {/* <td style={{ border: '1px solid black', paddingLeft: '5px' }}>
              Type<br /><b>..</b>
            </td> */}
          <tr>
            <td colSpan="4" style={{ border: '1px solid black' }}>
              <p style={{ margin: '5px 0 0 10px' }}>
                <b>From : </b><br/>
                {item.sender.name}<br />
              <b>  {item.sender.city}</b> , {item.sender.AddressLine1} <br/>
              {item.sender.AddressLine2?(<p>{item.sender.AddressLine2}</p>):null}
              </p>
              <hr style={{ margin: '2px 10px' }} />
              <p style={{ margin: '0 0 5px 10px' }}>{item.sender.mobile}</p>
            </td>
          </tr>
          <tr>
            <td colSpan="4" style={{ border: '1px solid black' }}>
              <table width="100%" border="0" cellPadding="0" cellSpacing="0" style={{ borderCollapse: 'collapse' }}>
                <tr>
                  <td colSpan="2"><p style={{ marginLeft: '10px' }}>
                  <b>To : </b><br/>
                    {item.reciver.name}</p></td>
                </tr>
                <tr>
                  <td colSpan="2"><p style={{ marginLeft: '10px' }}><b>{item.reciver.city}</b> , {item.reciver.AddressLine1}<br/>
                  {item.reciver.AddressLine2?(<p>{item.reciver.AddressLine2}</p>):null}</p></td>
                </tr>
                {/* <tr>
                  <td colSpan="2"><p style={{ marginLeft: '10px' }}></p></td>
                </tr>
                <tr>
                  <td colSpan="4">
                    <p style={{ marginLeft: '10px' }}>{item.reciver.city}</p>
                  </td>
                </tr> */}
                <tr>
                  <td width="30%"><p style={{ margin: '0px 0 0px 10px' }}>{item.reciver.mobile}</p></td>
                  {/* <td width="30%" valign="top"></td> */}
                </tr>
                <tr 
                style={{ borderTop: '1px solid black' }}
                >
                  <td width="40%"><p style={{ margin: '0px 0 5px 5px' }}>ReferenceId:</p><strong style={{ marginLeft: '5px' }}>{item.data.Items[0].ReferenceId}</strong></td>
                  {/* <td width="40%" valign="top">Consignee Ref:</td> */}
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            {/* <td colSpan="3" style={{ border: '1px solid black' }}>
              <div>
                {/* <p style={{ padding: '10px 0 0', textAlign: 'center' }}>
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAN4AAAAhAQMAAACMbYc4AAAABlBMVEX///8AAABVwtN+AAAAAXRSTlMAQObYZgAAAAlwSFlzAAAOxAAADsQBlSsOGwAAADBJREFUKJFjuCS7e1nM6b3WtltteoKSbONenjVRvvJlk5y3VfIahlHJUclRyUErCQBzBsPh8JDsagAAAABJRU5ErkJggg==" alt="barcode" style={{ width: '6cm', height: '1cm', padding: '1px' }} />
                </p> 
                <p style={{ textAlign: 'center' }}>{item.data.Items[0].ReferenceId}</p>
              </div>
            </td> */}
            {/* <td style={{ border: '1px solid black', textAlign: 'center' }}>
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAA/AQMAAABtkYKcAAAABlBMVEX///8AAABVwtN+AAAAAXRSTlMAQObYZgAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAMpJREFUKJGF0s0NwyAMBWB3gWaDsAhS1kovySbtKmEBWCG3XJG4tFLEq7HbpvmpanH4JIRsHhAwx6pBpkOkUBDJpsHSeUGCTcHCF1D1G7QF8AfcIvevXgoeA1jNswdXrEhLAcdbiJ3ArfEALwZdpmsrZ96oe9zQJM+YzSGkF7UU2wW427qfyjwKv0IWcOXTqBMqyr0cslzQDM0GCE3uJPBgucUHJagwcy+GcaPZYlbUxJmvwPFSJw+3A28ZeWUM1vgFkjxu+iX6bzwBIvo4+1Iuqt4AAAAASUVORK5CYII=" alt="qrcode" />
            </td> */}
          </tr>
          {/* <tr>
            <td colSpan="4" style={{ border: '1px solid black' }}>
              <p style={{ margin: '0px 0 5px 5px', fontSize: '12px' }}>
                Description:
              </p>
            </td>
          </tr> */}
        </table>
      </div>
    
{/* 
      {itemPieces.length > 1 && itemPieces.map((piece, index) => (
            <div className={isZoomed ? 'zoom-in mt-5' : 'mt-5'} key={index} style={{ backgroundColor: '#fefefe', border: '0px solid #888',direction:'ltr', margin: '15px 0', overflow: 'hidden' }}>
            <table cellPadding="0" cellSpacing="0" style={{ border: '1px solid black', borderCollapse: 'collapse', width: '360px', height: '550px', margin: '0px 0 0px 0px', padding: '0' }}>
              <tr>
                <td style={{ border: '1px solid black', textAlign: 'center' }}>
                  <img src={spl} width="80px" alt="logo" />
                </td>
                <td colSpan="3" style={{ border: '1px solid black' }}>
                  {/* <p style={{ paddingRight: '10px', textAlign: 'right', paddingTop: '5px' }}>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJEAAAAhAQMAAADj3NsVAAAABlBMVEX///8AAABVwtN+AAAAAXRSTlMAQObYZgAAAAlwSFlzAAAOxAAADsQBlSsOGwAAACRJREFUKJFjuCR4uyT25URhzVaevdesS5JzShsYRsVGxQZQDABosyRsJPGMbQAAAABJRU5ErkJggg==" alt="barcode" style={{ width: '6cm', height: '1cm', padding: '1px' }} />
                  </p> *
              <p className='barcode1' style={{textAlign: 'right', marginBottom:0}}>
              <Barcode value={item.data.Items[0].Barcode}/>
              </p>                
              </td>
              </tr>
              <tr>
                <td rowSpan="2" style={{ border: '1px solid black' }}>
                  <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginLeft: '5px' }}><b></b></h1>
                  <h4 style={{ fontSize: '10px', fontWeight: 'bold', marginLeft: '5px' }}>{item.reciver.city}</h4>
                </td>
                <td colSpan="2" style={{ border: '1px solid black' }}>
                <p style={{ marginLeft: '5px', fontSize: '16px' }}>
                {item.marktercode?(<><span>marktercode: </span><b>{item.marktercode}</b></>):''}
                <br />
                {item.paytype?(<><span></span><b>{item.paytype}</b></>):''}
                <br/>
                {/* {item.price?(<><span>price: </span><b>{item.price} SAR</b></>):''} */}

                {/* <b>0 SAR</b> *
              </p>
                </td>
                <td colSpan="1" rowSpan="1" style={{ border: '1px solid black' }}>
                  <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginLeft: '5px' }}><b>Zone </b></h1>
                  <p style={{ fontSize: '14px', marginLeft: '5px' }}>{item.reciver.city}</p>
                </td>
              </tr>
              {/* <tr>
                <td style={{ border: '1px solid black', paddingLeft: '5px' }}>
                  <p>DOM</p>
                </td>
                <td style={{ border: '1px solid black', paddingLeft: '5px' }} colSpan="2">
                  <p>Contact Us: </p>
                </td>
              </tr> *
              <tr>
                <td colSpan="4" bgcolor="#333333" style={{ border: '1px solid black' }}>
                  <p style={{ color: '#FFF' }}>
                    {item.createdate?(<><span>Date: </span>{item.createdate.slice(0,15)}</>):''}
                  </p>
                </td>
              </tr>
              
              <tr>
                <td style={{ border: '1px solid black' }}>
                  <p style={{ verticalAlign: 'middle', float: 'left', marginTop: '8px' }}>Pieces: </p>
                  <p style={{ verticalAlign: 'middle', float: 'right', fontSize: '28px', marginRight: '4px' }}>
                    {piece.PieceWeight}
                  </p>
                </td>
                <td style={{ padding: '0 5px 0 5px', border: '1px solid black' }}>PieceDescription: <br /><b>{piece.PieceDescription}</b></td>
                <td className='barcode2' style={{ padding: '0 5px 0 5px', border: '1px solid black' }}><Barcode value={piece.PieceBarcode} /> </td>
                
              </tr>
              {/* <td style={{ border: '1px solid black', paddingLeft: '5px' }}>
                  Type<br /><b>..</b>
                </td> *
              <tr>
                <td colSpan="4" style={{ border: '1px solid black' }}>
                  <p style={{ margin: '5px 0 0 10px' }}>
                    {item.sender.name}<br />
                  <b>  {item.sender.city}</b> , {item.sender.AddressLine1} <br/>
                  (عنوان اخر) :
                  {item.sender.AddressLine2}
                  </p>
                  <hr style={{ margin: '2px 10px' }} />
                  <p style={{ margin: '0 0 5px 10px' }}>{item.sender.mobile}</p>
                </td>
              </tr>
              <tr>
                <td colSpan="4" style={{ border: '1px solid black' }}>
                  <table width="100%" border="0" cellPadding="0" cellSpacing="0" style={{ borderCollapse: 'collapse' }}>
                    <tr>
                      <td colSpan="2"><p style={{ marginLeft: '10px' }}> {item.reciver.name}</p></td>
                    </tr>
                    <tr>
                      <td colSpan="2"><p style={{ marginLeft: '10px' }}><b>{item.reciver.city}</b> , {item.reciver.AddressLine1}<br/>
                      (عنوان اخر) :
                      {item.reciver.AddressLine2}

                       </p></td>
                    </tr>
                    {/* <tr>
                      <td colSpan="2"><p style={{ marginLeft: '10px' }}></p></td>
                    </tr>
                    <tr>
                      <td colSpan="4">
                        <p style={{ marginLeft: '10px' }}>{item.reciver.city}</p>
                      </td>
                    </tr> *
                    <tr>
                      <td width="30%"><p style={{ margin: '0px 0 0px 10px' }}>{item.reciver.mobile}</p></td>
                      {/* <td width="30%" valign="top"></td> */}
                    {/* </tr>
                    <tr style={{ borderTop: '1px solid black' }}>
                      <td width="40%"><p style={{ margin: '0px 0 5px 5px' }}>ReferenceId:</p><strong style={{ marginLeft: '5px' }}>{item.data.Items[0].ReferenceId}</strong></td>
                      {/* <td width="40%" valign="top">Consignee Ref:</td> * *
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td colSpan="3" style={{ border: '1px solid black' }}>
                  <div>
                    {/* <p style={{ padding: '10px 0 0', textAlign: 'center' }}>
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAN4AAAAhAQMAAACMbYc4AAAABlBMVEX///8AAABVwtN+AAAAAXRSTlMAQObYZgAAAAlwSFlzAAAOxAAADsQBlSsOGwAAADBJREFUKJFjuCS7e1nM6b3WtltteoKSbONenjVRvvJlk5y3VfIahlHJUclRyUErCQBzBsPh8JDsagAAAABJRU5ErkJggg==" alt="barcode" style={{ width: '6cm', height: '1cm', padding: '1px' }} />
                    </p> *
                    <p style={{ textAlign: 'center' }}>{item.data.Items[0].ReferenceId}</p>
                  </div>
                </td>
                {/* <td style={{ border: '1px solid black', textAlign: 'center' }}>
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAA/AQMAAABtkYKcAAAABlBMVEX///8AAABVwtN+AAAAAXRSTlMAQObYZgAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAMpJREFUKJGF0s0NwyAMBWB3gWaDsAhS1kovySbtKmEBWCG3XJG4tFLEq7HbpvmpanH4JIRsHhAwx6pBpkOkUBDJpsHSeUGCTcHCF1D1G7QF8AfcIvevXgoeA1jNswdXrEhLAcdbiJ3ArfEALwZdpmsrZ96oe9zQJM+YzSGkF7UU2wW427qfyjwKv0IWcOXTqBMqyr0cslzQDM0GCE3uJPBgucUHJagwcy+GcaPZYlbUxJmvwPFSJw+3A28ZeWUM1vgFkjxu+iX6bzwBIvo4+1Iuqt4AAAAASUVORK5CYII=" alt="qrcode" />
                </td> *
              </tr>
              {/* <tr>
                <td colSpan="4" style={{ border: '1px solid black' }}>
                  <p style={{ margin: '0px 0 5px 5px', fontSize: '12px' }}>
                    Description:
                  </p>
                </td>
              </tr> *
            </table>
          </div>
          ))}
          */}
  </div>

  </div>
  )
}
