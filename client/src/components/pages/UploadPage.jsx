import Navbar from "../Navbar";
import UploadForm from "../sections/UploadForm";

const UploadPage = () => {
    return (
        <div>
            <Navbar />
            <h1>Upload Page</h1>
            <p>Here you can upload your cursor packs.</p>
            <UploadForm />
        </div>
    );
}


export default UploadPage;