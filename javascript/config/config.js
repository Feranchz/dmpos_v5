class _Config {
    constructor () {
        this.paths = {
          wsHistorial:''
        }
    this.paths.wsHistorial="https://sgvk24hul1.execute-api.us-west-2.amazonaws.com/beta/getOrdersByDate"
    this.paths.wsPedidos="https://sgvk24hul1.execute-api.us-west-2.amazonaws.com/beta/getOrdersPending"
}
}
var Config = new _Config()