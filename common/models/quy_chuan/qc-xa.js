module.exports = function(QCXa) {
    const Promise = require('bluebird')

    QCXa.createXa = async function(uid, ma, qcHuyenId, ten, ghiChu, cap, loai, nt, bg, hd, dbkk){
        const xaData = {
            uid: uid,
            ma: ma,
            qcHuyenId: qcHuyenId,
            ten: ten,
            ghiChu: ghiChu,
            sysCapDonViHanhChinhId: cap,
            loaiDonViHanhChinh: loai,
            nongThon: nt,
            bienGioi: bg,
            haiDao: hd,
            vungDBKhoKhan: dbkk,
            createdAt: new Date(),
            createdBy: 0
        }
        try {
            const data = await QCXa.create(xaData)
            return data
        } catch (err) {
            console.log('createQCXa', err)
            throw err
        }
    }

    QCXa.updateXa = async function(id, ma, qcHuyenId, ten, ghiChu, cap, loai, nt, bg, hd, dbkk, hieuLuc){
       const xaData = {
            id: id,
            ma: ma,
            qcHuyenId: qcHuyenId,
            ten: ten,
            ghiChu: ghiChu,
            sysCapDonViHanhChinhId: cap,
            loaiDonViHanhChinh: loai,
            nongThon: nt,
            bienGioi: bg,
            haiDao: hd,
            vungDBKhoKhan: dbkk,
            hieuLuc: hieuLuc
        }
        try {
            const data = await QCXa.upsertWithWhere({id: xaData.id, xoa: false}, xaData)
            return data
        } catch (err) {
            console.log('updateQCXa', err)
            throw err
        }
    }

    QCXa.deleteXa = async function(id){
        try {
            const data = await QCXa.upsertWithWhere({id: id},{ xoa: true })
            return data
        } catch (err) {
            console.log('deleteQCXa', err)
            throw err
        }
    }
    
    QCXa.restoreXa = async function(id){
        try {
            const data = await QCXa.upsertWithWhere({id: id}, { xoa: false })
            return data
        } catch (err) {
            console.log('restoreQCXa', err)
            throw err
        }
    }

    QCXa.readXa = async function(id){
        try {
            const data = await QCXa.findById(id, {where: {xoa: false}})
            return data
        } catch (err) {
            console.log('readQCXa', err)
            throw err
        }
    }

    QCXa.listXa = async function(queryData, page, pageSize){
        try {
            const [data, total] = await Promise.all([
                QCXa.find({
                where: {xoa: 0},
                fields: {ma: true, ten: true, ghiChu: true, qcHuyenId: true, sysCapDonViHanhChinhId: true, hieuLuc: true},
                include: ['belongsToQCHuyen', 'belongsToSysCapHanhChinh'],
                limit: pageSize,
                skip: page
              }),
              QCXa.count({xoa: false})
            ])
            return {
              rows: data,
              page: page,
              pageSize: pageSize,
              total: total
            }
        } catch (err) {
            console.log('listQCXa', err)
            throw err
        }
    }

    QCXa.listDeletedXa = async function(queryData, page, pageSize){
        try {
            const [data, total] = await Promise.all([
                QCXa.find({
                where: {xoa: 1},
                fields: {ma: true, ten: true, ghiChu: true, qcHuyenId: true, sysCapDonViHanhChinhId: true, hieuLuc: true},
                include: ['belongsToQCHuyen', 'belongsToSysCapHanhChinh'],
                limit: pageSize,
                skip: page
              }),
              QCXa.count({xoa: true})
            ])
            return {
              rows: data,
              page: page,
              pageSize: pageSize,
              total: total
            }
        } catch (err) {
            console.log('listDeletedQCXa', err)
            throw err
        }
    }

    QCXa.remoteMethod(
        'createXa', {
            http: {path: '/create', verb: 'post'},
            accepts: [
                {arg: 'uid', type: 'string', required: true},
                {arg: 'ma', type: 'string', required: true},
                {arg: 'qcHuyenId', type: 'number', required: true},
                {arg: 'ten', type: 'string'},
                {arg: 'ghiChu', type: 'string'},
                {arg: 'cap', type: 'number', required: true},
                {arg: 'loai', type: 'string', required: true},
                {arg: 'nt', type: 'string'},
                {arg: 'bg', type: 'string'},
                {arg: 'hd', type: 'string'},
                {arg: 'dbkk', type: 'string'}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QCXa.remoteMethod(
        'updateXa', {
            http: {path: '/update', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true},
                {arg: 'ma', type: 'string'},
                {arg: 'qcHuyenId', type: 'number'},
                {arg: 'ten', type: 'string'},
                {arg: 'ghiChu', type: 'string'},
                {arg: 'cap', type: 'number'},
                {arg: 'loai', type: 'string'},
                {arg: 'nt', type: 'string'},
                {arg: 'bg', type: 'string'},
                {arg: 'hd', type: 'string'},
                {arg: 'dbkk', type: 'string'},
                {arg: 'hieuLuc', type: 'number'}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QCXa.remoteMethod(
        'deleteXa', {
            http: {path: '/delete', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QCXa.remoteMethod(
        'restoreXa', {
            http: {path: '/restore', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QCXa.remoteMethod(
        'readXa', {
            http: {path: '/read', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QCXa.remoteMethod(
        'listXa', {
            http: {path: '/list', verb: 'post'},
            accepts: [
                {arg: 'queryData', type: 'object'},
                {arg: 'page', type: 'number', default: '0'},
                {arg: 'pageSize', type: 'number', default: '20'}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QCXa.remoteMethod(
        'listDeletedXa', {
            http: {path: '/deleted_list', verb: 'post'},
            accepts: [
                {arg: 'queryData', type: 'object'},
                {arg: 'page', type: 'number', default: '0'},
                {arg: 'pageSize', type: 'number', default: '20'}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )
}