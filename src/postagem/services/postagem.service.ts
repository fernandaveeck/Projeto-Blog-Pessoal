import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ILike, Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult } from "typeorm/browser";

@Injectable()
export class PostagemService {
    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>) { }

    async findAll(): Promise<Postagem[]> {
        return await this.postagemRepository.find();
    }

    async findById(id: number): Promise<Postagem> {
        const postagem = await this.postagemRepository.findOne({ where: { id } });

        if (!postagem)
            throw new HttpException("Postagem não encontrada!", HttpStatus.NOT_FOUND);

        return postagem;
    }

    async findByTitulo(titulo: string): Promise<Postagem[]> {
        return await this.postagemRepository.find({ where: { titulo: ILike(`%${titulo}%`) } });
    }

    //EXTRA ----------------------------------------------------------------

    async findByTexto(texto:string): Promise<Postagem[]> {
        return await this.postagemRepository.find({where: {texto: ILike (`%${texto}%`)}})
    }
    //----------------------------------------------------------------------
    
    async create(postagem: Postagem): Promise<Postagem> {
        return await this.postagemRepository.save(postagem);
    }

    async uptade(postagem: Postagem): Promise<Postagem> {
        await this.findById(postagem.id);

        return await this.postagemRepository.save(postagem);
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id);

        return await this.postagemRepository.delete(id);
    }
}