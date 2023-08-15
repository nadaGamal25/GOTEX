import React from 'react'
import spl from '../../assets/spl.jpg'
export default function SplSticker({item}) {
    console.log(item)
    const itemPieces = item.data.Items[0].ItemPiecesResponse;
  return (
    <div className='ms-4'>
    <style>
      {`
        * {
          padding: 0;
          margin: 0;
        }
        div {
          page-break-after: always;
        }
      `}
    </style>
      <div style={{ backgroundColor: '#fefefe', border: '0px solid #888',direction:'ltr', margin: '15px 0', overflow: 'hidden' }}>
        <table cellPadding="0" cellSpacing="0" style={{ border: '1px solid black', borderCollapse: 'collapse', width: '360px', height: '550px', margin: '0px 0 0px 0px', padding: '0' }}>
          <tr>
            <td style={{ border: '1px solid black', textAlign: 'center' }}>
              <img src={spl} width="80px" alt="logo" />
            </td>
            <td colSpan="3" style={{ border: '1px solid black' }}>
              {/* <p style={{ paddingRight: '10px', textAlign: 'right', paddingTop: '5px' }}>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJEAAAAhAQMAAADj3NsVAAAABlBMVEX///8AAABVwtN+AAAAAXRSTlMAQObYZgAAAAlwSFlzAAAOxAAADsQBlSsOGwAAACRJREFUKJFjuCR4uyT25URhzVaevdesS5JzShsYRsVGxQZQDABosyRsJPGMbQAAAABJRU5ErkJggg==" alt="barcode" style={{ width: '6cm', height: '1cm', padding: '1px' }} />
              </p> */}
              <p style={{ paddingLeft: '3px', textAlign: 'center' }}>{item.data.Items[0].Barcode}</p>
            </td>
          </tr>
          <tr>
            <td rowSpan="2" style={{ border: '1px solid black' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginLeft: '5px' }}><b></b></h1>
              <h4 style={{ fontSize: '10px', fontWeight: 'bold', marginLeft: '5px' }}>{item.reciver.city}</h4>
            </td>
            <td colSpan="2" style={{ border: '1px solid black' }}>
              <p style={{ marginLeft: '5px', fontSize: '16px' }}>
                ..<sup style={{ fontSize: '11px', marginLeft: '2px' }}></sup><br />
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
            <td colSpan="4" bgcolor="#333333" style={{ border: '1px solid black' }}>
              <p style={{ color: '#FFF' }}>
                Services:
              </p>
            </td>
          </tr>
          {itemPieces.map((piece, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid black' }}>
                <p style={{ verticalAlign: 'middle', float: 'left', marginTop: '8px' }}>Pieces: </p>
                <p style={{ verticalAlign: 'middle', float: 'right', fontSize: '28px', marginRight: '4px' }}>
                  {piece.PieceWeight}
                </p>
              </td>
              <td style={{ padding: '0 5px 0 5px', border: '1px solid black' }}>PieceDescription: <br /><b>{piece.PieceDescription}</b></td>
              <td style={{ padding: '0 5px 0 5px', border: '1px solid black' }}>PieceBarcode: <br /><b>{piece.PieceBarcode}</b></td>
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
                {item.sender.name}<br />
              <b>  {item.sender.city}</b> , {item.sender.AddressLine1}
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
                  <td colSpan="2"><p style={{ marginLeft: '10px' }}><b>{item.reciver.city}</b> , {item.reciver.AddressLine1}</p></td>
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
            <td colSpan="3" style={{ border: '1px solid black' }}>
              <div>
                {/* <p style={{ padding: '10px 0 0', textAlign: 'center' }}>
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAN4AAAAhAQMAAACMbYc4AAAABlBMVEX///8AAABVwtN+AAAAAXRSTlMAQObYZgAAAAlwSFlzAAAOxAAADsQBlSsOGwAAADBJREFUKJFjuCS7e1nM6b3WtltteoKSbONenjVRvvJlk5y3VfIahlHJUclRyUErCQBzBsPh8JDsagAAAABJRU5ErkJggg==" alt="barcode" style={{ width: '6cm', height: '1cm', padding: '1px' }} />
                </p> */}
                <p style={{ textAlign: 'center' }}>{item.data.Items[0].ReferenceId}</p>
              </div>
            </td>
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

      {itemPieces.map((piece, index) => (
            <div key={index} className='mt-5' style={{ backgroundColor: '#fefefe', border: '0px solid #888',direction:'ltr', margin: '15px 0', overflow: 'hidden' }}>
            <table cellPadding="0" cellSpacing="0" style={{ border: '1px solid black', borderCollapse: 'collapse', width: '360px', height: '550px', margin: '0px 0 0px 0px', padding: '0' }}>
              <tr>
                <td style={{ border: '1px solid black', textAlign: 'center' }}>
                  <img src={spl} width="80px" alt="logo" />
                </td>
                <td colSpan="3" style={{ border: '1px solid black' }}>
                  {/* <p style={{ paddingRight: '10px', textAlign: 'right', paddingTop: '5px' }}>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJEAAAAhAQMAAADj3NsVAAAABlBMVEX///8AAABVwtN+AAAAAXRSTlMAQObYZgAAAAlwSFlzAAAOxAAADsQBlSsOGwAAACRJREFUKJFjuCR4uyT25URhzVaevdesS5JzShsYRsVGxQZQDABosyRsJPGMbQAAAABJRU5ErkJggg==" alt="barcode" style={{ width: '6cm', height: '1cm', padding: '1px' }} />
                  </p> */}
                  <p style={{ paddingLeft: '3px', textAlign: 'center' }}>{item.data.Items[0].Barcode}</p>
                </td>
              </tr>
              <tr>
                <td rowSpan="2" style={{ border: '1px solid black' }}>
                  <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginLeft: '5px' }}><b></b></h1>
                  <h4 style={{ fontSize: '10px', fontWeight: 'bold', marginLeft: '5px' }}>{item.reciver.city}</h4>
                </td>
                <td colSpan="2" style={{ border: '1px solid black' }}>
                  <p style={{ marginLeft: '5px', fontSize: '16px' }}>
                    ..<sup style={{ fontSize: '11px', marginLeft: '2px' }}></sup><br />
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
                <td colSpan="4" bgcolor="#333333" style={{ border: '1px solid black' }}>
                  <p style={{ color: '#FFF' }}>
                    Services:
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
                <td style={{ padding: '0 5px 0 5px', border: '1px solid black' }}>PieceBarcode: <br /><b>{piece.PieceBarcode}</b></td>
                
              </tr>
              {/* <td style={{ border: '1px solid black', paddingLeft: '5px' }}>
                  Type<br /><b>..</b>
                </td> */}
              <tr>
                <td colSpan="4" style={{ border: '1px solid black' }}>
                  <p style={{ margin: '5px 0 0 10px' }}>
                    {item.sender.name}<br />
                  <b>  {item.sender.city}</b> , {item.sender.AddressLine1}
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
                      <td colSpan="2"><p style={{ marginLeft: '10px' }}><b>{item.reciver.city}</b> , {item.reciver.AddressLine1}</p></td>
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
                    <tr style={{ borderTop: '1px solid black' }}>
                      <td width="40%"><p style={{ margin: '0px 0 5px 5px' }}>ReferenceId:</p><strong style={{ marginLeft: '5px' }}>{item.data.Items[0].ReferenceId}</strong></td>
                      {/* <td width="40%" valign="top">Consignee Ref:</td> */}
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td colSpan="3" style={{ border: '1px solid black' }}>
                  <div>
                    {/* <p style={{ padding: '10px 0 0', textAlign: 'center' }}>
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAN4AAAAhAQMAAACMbYc4AAAABlBMVEX///8AAABVwtN+AAAAAXRSTlMAQObYZgAAAAlwSFlzAAAOxAAADsQBlSsOGwAAADBJREFUKJFjuCS7e1nM6b3WtltteoKSbONenjVRvvJlk5y3VfIahlHJUclRyUErCQBzBsPh8JDsagAAAABJRU5ErkJggg==" alt="barcode" style={{ width: '6cm', height: '1cm', padding: '1px' }} />
                    </p> */}
                    <p style={{ textAlign: 'center' }}>{item.data.Items[0].ReferenceId}</p>
                  </div>
                </td>
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
          ))}
  </div>
  )
}
