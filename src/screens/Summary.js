import React, { useState, useEffect } from 'react';
import InputTime from '../components/InputTime';
import moment from 'moment';
import { connect } from 'react-redux';
import { orderActions } from '../redux/order/action';
import { Icon, Pagination } from 'antd';
import useLongPress from '../hook/useLongPress';
import DeleteFormModal from '../components/DeleteFormModal';

const PAGE_SIZE = 10;

let tid;
let selected;

const SummaryScreen = props => {

    const { orders } = props;
    const [page, setPage] = useState(1);
    const [visible, setVisible] = useState(false);

    console.log(orders);

    const today = moment();
    const [startTime, setStartTime] = useState({ day: today.date(), month: today.month(), year: today.year() });
    const [endTime, setEndTime] = useState({ day: today.date(), month: today.month(), year: today.year() });

    const handleStartHold = (data) => {
        selected = data;
        tid = setTimeout(() => {
            handleDelete();
        }, 800);
        return data;
    }

    const hanleEndHold = () => {
        clearTimeout(tid);
    }

    const handleDelete = () => {
        setVisible(true);
    }

    const filteredOrder = orders ? orders.sort((a, b) => b.timestamp.toDate() - a.timestamp.toDate()).filter((o) => {
        const mDate = moment(o.timestamp.toDate().toString());
        const mStart = moment().date(startTime.day).month(startTime.month).year(startTime.year).hour(0).minute(0).second(0);
        const mEnd = moment().date(endTime.day).month(endTime.month).year(endTime.year).hour(23).minute(59).second(59);

        return o.status === 'accepted' && (mDate.isSameOrAfter(mStart) && mDate.isSameOrBefore(mEnd));
    }) : [];

    const renderSummary = () => {
        if (!filteredOrder)
            return <Icon type='loading' />
        if (filteredOrder.length === 0)
            return <p> -- No Order -- </p>

        const sumOrder = {};
        filteredOrder.forEach((oData) => {
            oData.order.forEach((o) => {
                const { price, count, data } = o;
                if (!sumOrder[data.name])
                    sumOrder[data.name] = { count, price }
                else
                    sumOrder[data.name] = { count: sumOrder[data.name].count + count, price: sumOrder[data.name].price + price };
            })
        });

        const totalPrice = Object.values(sumOrder).reduce((prev, cur) => prev + cur.price, 0);
        const totalCount = Object.values(sumOrder).reduce((prev, cur) => prev + cur.count, 0);

        return (
            <table>
                <colgroup>
                    <col width='260' />
                    <col width='100' />
                    <col width='100' />
                </colgroup>
                <tbody>
                    {
                        Object.entries(sumOrder).sort((a, b) => b[1].price - a[1].price).map(([k, v], index) => (
                            <tr key={index}>
                                <td><p>{k}</p></td>
                                <td style={{ textAlign: 'right', paddingBottom: (index === Object.values(sumOrder).length - 1) ? 6 : 0 }}><p>{v.count}</p></td>
                                <td style={{ textAlign: 'right', paddingBottom: (index === Object.values(sumOrder).length - 1) ? 6 : 0 }}><h4>{v.price}</h4></td>
                            </tr>
                        ))
                    }
                    <tr style={{ borderTop: '1px solid var(--gray-light)' }}>
                        <td style={{ paddingTop: 4 }}><p>Total</p></td>
                        <td style={{ paddingTop: 4, textAlign: 'right' }}><p>{totalCount}</p></td>
                        <td style={{ paddingTop: 4, textAlign: 'right' }}><h4>฿ {totalPrice}</h4></td>
                    </tr>
                </tbody>
            </table>
        )
    }

    const renderDetail = () => {
        let k = 0;

        const start = (page - 1) * PAGE_SIZE;
        const end = (page) * PAGE_SIZE;

        return (
            <div className='list'>
                <table>
                    <colgroup>
                        <col width='100' />
                        <col width='100' />
                        <col width='200' />
                        <col width='100' />
                    </colgroup>
                    <thead>
                        <tr className='head-row'>
                            <td className='col'>Time</td>
                            <td className='col'>Name</td>
                            <td className='col'>Menu</td>
                            <td className='col'>Amount</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredOrder.slice(start, end).map((oData) => {
                                const mDate = moment(oData.timestamp.toDate().toString());
                                const len = oData.order.length;
                                return _.range(0, len).map((index) => {
                                    const o = oData.order[index];
                                    if (index === 0)
                                        return (
                                            <tr key={k++}
                                                onMouseDown={() => handleStartHold(oData)}
                                                onMouseUp={hanleEndHold}
                                                onMouseLeave={hanleEndHold}
                                                onTouchStart={() => handleStartHold(oData)}
                                                onTouchEnd={hanleEndHold}
                                            >
                                                <td className={`col ${index === len - 1 ? 'border-bottom' : ''}`} valign='top' align='center'><p>{mDate.format('HH:mm')}</p></td>
                                                <td className={`col ${index === len - 1 ? 'border-bottom' : ''}`} valign='top'><p>{oData.customerName}</p></td>
                                                <td className={`col ${index === len - 1 ? 'border-bottom' : ''}`} valign='top'><p>{o.data.name}</p></td>
                                                <td className={`col ${index === len - 1 ? 'border-bottom' : ''}`} valign='top' align='center'><p>{o.count}</p></td>
                                            </tr>
                                        )
                                    return (
                                        <tr key={k++}
                                            onMouseDown={() => handleStartHold(oData)}
                                            onMouseUp={hanleEndHold}
                                            onMouseLeave={hanleEndHold}
                                            onTouchStart={() => handleStartHold(oData)}
                                            onTouchEnd={hanleEndHold}
                                        >
                                            <td className={`col ${index === len - 1 ? 'border-bottom' : ''}`} valign='top' align='center'><p>{''}</p></td>
                                            <td className={`col ${index === len - 1 ? 'border-bottom' : ''}`} valign='top'><p>{''}</p></td>
                                            <td className={`col ${index === len - 1 ? 'border-bottom' : ''}`} valign='top'><p>{o.data.name}</p></td>
                                            <td className={`col ${index === len - 1 ? 'border-bottom' : ''}`} valign='top' align='center'><p>{o.count}</p></td>
                                        </tr>
                                    )
                                })
                            })
                        }
                    </tbody>
                </table>
                {
                    filteredOrder.length > PAGE_SIZE && (
                        <Pagination style={{ marginTop: 8 }} size='small' onChange={(p) => setPage(p)} current={page} total={filteredOrder.length} pageSize={PAGE_SIZE} />
                    )
                }
            </div>
        )
    }

    return (
        <div className='container'>
            <div className='table-container'>
                <table align='center'>
                    <tbody>
                        <tr>
                            <td><h4>From</h4></td>
                            <td><InputTime value={startTime} onSelect={(k, v) => setStartTime({ ...startTime, [k]: v })} /></td>
                        </tr>
                        <tr>
                            <td><h4>To</h4></td>
                            <td><InputTime value={endTime} onSelect={(k, v) => setEndTime({ ...endTime, [k]: v })} /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='summary-section'>
                <div className='summary-card'>
                    <h3>Summary</h3>
                    {renderSummary()}
                </div>
            </div>
            <div className='detail-section'>
                <h3>Detail</h3>
                {renderDetail()}
            </div>
            <DeleteFormModal type='Order' data={selected} onCancel={() => setVisible(false)} visible={visible} />
            <style jsx>{`
                .table-container, .detail-section {
                    padding: 8px;
                }
                .summary-section {
                    padding: 12px 14px;
                    background-color: var(--gray-light3);
                }
                .summary-card {
                    padding: 10px;
                    border-radius: 8px;
                    border: 1px solid var(--yellow);
                    background-color: var(--yellow-light);
                }
                .summary-card h3, .detail-section h3 {
                    margin-bottom: 8px;
                }
                :global(.col) {
                    font-size: .8em;
                    padding-top: 4px;
                }
                :global(.head-row .col) {
                    border-bottom: 1px solid var(--gray-light);
                    padding-bottom: 6px;
                    text-align: center;
                }
                :global(.border-bottom) {
                    padding-bottom: 4px;
                    border-bottom: 1px solid var(--gray-light2);
                }
                :global(.list) {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                }
            `}</style>
        </div>
    )
}

export default connect(state => state.Order, orderActions)(SummaryScreen);