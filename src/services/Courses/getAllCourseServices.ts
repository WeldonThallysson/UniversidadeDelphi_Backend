import prismaClient from "../../prisma";

interface IGetCourseService {
  category_id: string;
  name: string;
  id_author?: string
}

class GetAllCourseService {
  async execute({ category_id, name,id_author }: IGetCourseService) {
    if (name || category_id || id_author) {
      const getAllCourseFiltered = await prismaClient.courses.findMany({
          where: {
            name: name,
            category_id: category_id,
            id_author:id_author
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
