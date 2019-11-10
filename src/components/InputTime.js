import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Select } from 'antd';

const { Option } = Select;

const InputTime = props => {
    const { day, month, year } = props.value;

    return (
        <div className='container'>
            <div className='day'>
                <Select value={day} style={{ minWidth: 60 }} showSearch onSelect={d => props.onSelect && props.onSelect('day', d)}>
                    {
                        _.range(1, 32).map((v) => (
                            <Option key={v} value={v}>{v}</Option>
                        ))
                    }
                </Select>
            </div>
            <div className='month'>
                <Select value={month} style={{ minWidth: 100 }} showSearch onSelect={m => props.onSelect && props.onSelect('month', m)}>
                    {
                        _.range(0, 12).map((v) => (
                            <Option key={v} value={v}>{moment().month(v).format('MMMM')}</Option>
                        ))
                    }
                </Select>
            </div>
            <div className='year'>
                <Select value={year} defaultValue={moment().year()} showSearch onSelect={y => props.onSelect && props.onSelect('year', y)}>
                    {
                        _.range(1997, moment().year() + 11).map((v) => (
                            <Option key={v} value={v}>{v}</Option>
                        ))
                    }
                </Select>
            </div>
            <style jsx>{`
                .container {
                    display: inline-flex;
                }
                .day, .month {
                    margin-right: 8px;
                }
            `}</style>
        </div>
    )
}

export default InputTime;