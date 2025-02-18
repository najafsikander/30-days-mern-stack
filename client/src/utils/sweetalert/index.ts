
import Swal, { SweetAlertIcon } from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


const showConfirmationDialog = async () => {
  const result = await MySwal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes"
  });

  return result;
}

const showResultDialog = (title:string,message : string, icon:SweetAlertIcon) => {
  MySwal.fire({
    title: title,
    icon: icon,
    text:message,
    draggable: true
  });
}

export { showConfirmationDialog,showResultDialog };