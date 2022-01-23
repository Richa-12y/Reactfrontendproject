import apiClient from "../helpers/apiClient";

const FileService = {
    UploadFiles
}

function UploadFiles(files) {
    return apiClient.post('/File/UploadFiles', files)
        .then((res) => res)
        .catch(err => err);
}

export default FileService;
