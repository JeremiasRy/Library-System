import Button from "../inputs/Button";

export default function PaginationForm(props: {elementCount: number, page:number, pageSize:number, setPage:React.Dispatch<React.SetStateAction<number>>, setPageSize:React.Dispatch<React.SetStateAction<number>>, style:"normal" | "small"}) {
    
    function pageSizeOptions() {
        let options:any[] = [];
        for (let i = 10; i <= 50; i += 10) {
            options.push(<option key={i} value={i}>{i}</option>)
        }
        return options;
    }

    function pageDown() {
        if (props.page !== 1) {
            props.setPage(props.page - 1);
        }
    }

    function pageUp() {
        if (props.elementCount == props.pageSize) {
            props.setPage(props.page + 1);
        }
    }

    return (
        <div className={`pagination-form-${props.style}`}>
            <h4>Page</h4>
            <div className={`pagination-form-${props.style}__actions`}>
                <Button onClick={pageDown} label={"<"} style={"pagination"}/>
                <div>{props.page}</div>
                <Button onClick={pageUp} label={">"} style={"pagination"} />
                <select value={props.pageSize} onChange={(e) => props.setPageSize(parseInt(e.currentTarget.value))}>
                    {pageSizeOptions()}
                </select>
            </div>
        </div>
    )
}