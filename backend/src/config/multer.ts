import multer, { MulterError } from 'multer'
import path from 'path'
import { Request, Response, NextFunction } from 'express'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const extensao = path.extname(file.originalname)
    cb(null, Date.now() + extensao)
  }
})

const uploadMiddleware = multer({
  storage,
  limits: { fileSize: 3 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const tiposPermitidos = [
      'image/jpeg', 
      'image/png', 
      'image/jpg', 
      'image/gif', 
      'image/webp', 
      'image/jif'
    ]

    if (tiposPermitidos.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Arquivo inválido'))
    }
  }
})

// Wrapper com tratamento de erro
export const upload = {
  single: (fieldName: string) =>
    (req: Request, res: Response, next: NextFunction) => {
      uploadMiddleware.single(fieldName)(req, res, (err) => {
        if (!err) return next()

        // Cliente cancelou — ignora silenciosamente
        if (req.destroyed || err.message === 'Request aborted') return

        // Erro do Multer (tamanho, tipo, etc.)
        if (err instanceof MulterError) {
          return res.status(400).json({ erro: err.message })
        }

        // Erro do fileFilter
        if (err.message === 'Arquivo inválido') {
          return res.status(400).json({ erro: 'Tipo de arquivo não permitido' })
        }

        return res.status(500).json({ erro: 'Erro no upload' })
      })
    }
}