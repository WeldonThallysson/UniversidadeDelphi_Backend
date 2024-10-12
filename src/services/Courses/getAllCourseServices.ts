import prismaClient from "../../prisma";

interface IGetCourseService {
  category_id: string;
  name: string;
}

class GetAllCourseService {
  async execute({ category_id, name }: IGetCourseService) {
    if (name) {
      const getAllCourseFiltered = await prismaClient.courses.findMany({
        ...(name && {
          where: {
            name: name,
            category_id: category_id,
          },
          select: {
            id: true,
            name: true,
            description: true,
            class: true,
            data: true,
            category_id: true,
            id_author: true,
            urlImage: true,
            status: true,
            created_At: true,
          },
        }),
      });

      return {
        data: getAllCourseFiltered,
        status: 200,
      };
    } else {
      const getAllCourse = await prismaClient.courses.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          class: true,
          data: true,
          category_id: true,
          id_author: true,
          urlImage: true,
          status: true,
          created_At: true,
        },
      });

      return {
        data: getAllCourse,
        status: 200,
      };
    }
  }
}

export { GetAllCourseService };
