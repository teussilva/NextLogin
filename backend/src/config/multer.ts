import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const extensao = path.extname(file.originalname)
    cb(null, Date.now() + extensao)
  }
})

export const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const tiposPermitidos = ['image/jpeg', 'image/png', 'image/jpg']

    if (tiposPermitidos.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Arquivo inválido'))
    }
  }
})