import React from 'react'

const DisplayData = (props) => {
    const { numbers, rowClicked } = props
    return (
        <div className="mb-3 text-center tableFixHead">
            <table className="table-hover table table-bordered table-responsive-md table-striped text-center">
                <thead>
                    <tr>
                        <th className="text-center" >Select your favourite number for further processing</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        numbers.map((number, index) => {
                            return <tr key={index}>
                                <td onClick={() => rowClicked(number)}> {number}
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}
export default DisplayData