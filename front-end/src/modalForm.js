// Add friend modal 

function modalForm(props) {
    return (
        <form>
          <label>{props}
            <input type="text" placeholder = {props} />
          </label>
        </form>
      )
}

export default modalForm; 