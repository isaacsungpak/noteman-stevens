import { useSelector } from "react-redux";
import styled from "styled-components";
import DeleteTagModal from "../Modals/DeleteTagModal";

const Bar = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;

    #delete {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px;
        cursor: pointer;

        :hover {
            color: #B80046;
        }
    }
`

const Option = styled.div`
    width: fit-content;
    max-width: calc(100% - 24px);
    height: fit-content;
    padding: 5px 7px;
    border-radius: 15px;
    background-color: ${props => props.selected ? "#cac0d8" : "#dfd9e8"};
    box-shadow:  ${props => props.selected ? "inset 0 0 4px rgba(12, 9, 16, 0.4)" : "none"};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    &:hover {
        cursor: pointer;
        background-color: ${props => props.selected ? "#cac0d8" : "#d4cce0"};
    }

`

function TagOption({ tagId, selectedTagId, setSelectedTagId }) {
    const tags = useSelector(state => state.tags.tags);

    return (
        <>
            {
                tags[tagId] &&
                <Bar>
                    <Option
                        selected={tagId === selectedTagId}
                        onClick={() => setSelectedTagId(tagId)}
                    >
                        {tags[tagId].title}
                    </Option>
                    <DeleteTagModal tag={tags[tagId]} selectedTagId={selectedTagId} setSelectedTagId={setSelectedTagId}/>
                </Bar>
            }
        </>
    )
}

export default TagOption;
