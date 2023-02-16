import React from 'react';

export default function MsgTmp({ index, list }) {
    let indexprev = index - 1;
    const createdAt = list[index].created_time
    const prev = list[indexprev];
    return (
        <>
            {prev &&
                <>
                    {createdAt.time === 'i' && prev.created_time.time === 'i' && (prev.created_time.count - createdAt.count) > 15 && (
                        <div className='Fdo Bsj Asc'>mon temps</div>
                    )}
                </>
            }
        </>
    )
}