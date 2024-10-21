import mongoose from './index.js'

const validateEmail = (value) => {
    return String(value)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

const serviceRequest = new mongoose.Schema({
    no: {
        type:String,
        required:true
    },
    name: {
        type: String,
        required: true,
        message: "Name is required"
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: validateEmail,
            message: props => `${props.value} is Invalid email`
        },
        message: "email is required"
    },
    mobile: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Open"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    assignedAt: {
        type: Date,
        default: null
    },
    assignedTo: {
        type: String,
        default: null
    },
    assignedById:{
        type:String,
        default:null
    },
    resolution: {
        type: String,
        default: null
    },
    resolvedAt:{
        type: Date,
        default: null
    }
}, {
    versionKey: false,
    collection: "service-requests"
})

const SRModel = mongoose.model('service-requests', serviceRequest)

export default SRModel