/* eslint-disable @typescript-eslint/no-unused-vars */
import { PaginationParams } from '@/core/repositories/pagination-params'
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { Prisma } from 'generated/prisma'
import { Student } from '@/domain/forum/enterprise/entities/student'
import { PrismaStudentMapper } from '../mappers/prisma-student-mapper'
@Injectable()
export class PrismaStudentsRepo implements StudentsRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<Student | null> {
    const student = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (!student) {
      return null
    }
    return PrismaStudentMapper.toDomain(student)
  }

  create(student: Student): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
