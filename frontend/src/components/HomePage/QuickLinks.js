import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Section = styled.div`
    height: 90vh;
    width: calc(50vw - 125px);
    display: flex;
    justify-content: center;
    align-items: start;
`

const List = styled.div`
    height: calc(100% - 60px);
    width: 80%;
    background-color: #DED8E8;
    border: 1px solid #b3a5ca;
    border-radius: 3px;
    box-shadow: 0 0 8px rgba(12, 9, 16, 0.2);

    #title {
        font-size: 20px;
        padding: 10px;
        // border-bottom: 1px solid #453750;
    }

    .quick {
        width: calc(100% - 20px);
        padding: 2px 10px;
        background-color: #DED8E8;

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        :nth-child(2n) {
            background-color: #C8BFD9;
        }
    }

    a {
        text-decoration: none;
        color: #0C0910;
        transition: all 0.3s ease-in-out;

        :hover {
            color: #73648A;
        }
    }

    #empty-message {
        color: #73648A;
    }


`

function QuickLinks() {
    const notebooks = useSelector(state => state.notebooks.notebooks);
    const organizedNotebooks = Object.values(notebooks).sort((a,b) => (new Date(b.updatedAt) - new Date(a.updatedAt)));

    return (
        <Section>
            <List>
                <div id="title">Recently Used Notebooks</div>
                {
                    organizedNotebooks.length > 0 ?
                        organizedNotebooks.map((notebook) => (
                            <div className="quick" key={`QL${notebook.id}`}><Link to={`/notebooks/${notebook.id}`}>{notebook.title}</Link></div>
                        )) :
                        <div id="empty-message">You don't have any notebooks yet :(</div>
                }
            </List>
        </Section>
    )
}

export default QuickLinks;
