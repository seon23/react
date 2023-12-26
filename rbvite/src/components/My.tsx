const My = () => {
    return (
        <>
            {/* 아이템 목록 */}
            <ul>
                {
                    
                }
                <button onClick={removeCartItem(id)}>X</button>
            </ul>    
            {/* 수정 또는 추가 입력 창 */}
            <form onSubmit={submit}>
                상품명{' '}<input type="text" />
                가격{' '}<input type="number" />
                <button type='submit'></button>
            </form>
    </>;

  )
};

export default My;
