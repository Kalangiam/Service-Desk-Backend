import SRModel from "../models/ServiceRequestModel.js"

const create = async (req, res) => {
    try {
        req.body.no = `SR${+new Date()}`
        let data = await SRModel.create(req.body)
        res.status(200).send({
            message:"service request Created"
        })
    } catch (error) {
        res.status(500).send({
            message: error.message || "internal Server Error"
        })
    }
}

const getBySrNo = async (req, res) => {
    try {
        let data = await SRModel.findOne({no:req.params.srno})
        if(data){
            res.status(200).send({
                message:"Data fetched",
                data
            })
        }
        else{
            res.send(400).send({
                message:"Incorrect srno"
            })
        }

    } catch (error) {
        res.status(500).send({
            message: error.message || "internal Server Error"
        })
    }

    } 
    

export default {
    create, getBySrNo
}
