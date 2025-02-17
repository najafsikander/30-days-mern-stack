import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const test = () => {
    MySwal.fire({
        title: 'Hello World',
        didOpen: () => {
          // `MySwal` is a subclass of `Swal` with all the same instance & static methods
          MySwal.showLoading()
        },
      }).then(() => {
        return MySwal.fire('It works')
      })
      
}

export {test};